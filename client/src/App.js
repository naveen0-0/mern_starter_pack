import React,{ useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios';



function App() {
  const [ name, setName ] = useState("");
  const [ items, setItems ] = useState([]);

  const nameChange = e => setName(e.target.value);

  const addItem = (e) => {
    e.preventDefault();
    setName("");
    Axios.post('/api/items',{name:name})
         .then(res=>console.log(res))
  }

  const deleteItem = (id) => {
    Axios.delete(`/api/items/${id}`)
         .then(res=>console.log(res))
         .catch(err=>console.log("Error"))
  }

  useEffect(()=> {
    async function getItems(){
      let { data } = await Axios.get('/api/items');
      setItems(data);
    }
    getItems()
  },[items])



  return (
    <div className="App">
      <form onSubmit={addItem} method="post">
        <input type="text" value={name} onChange={nameChange}/>
        <button type="submit">Add</button>
      </form>

      <div id="itemContainer">
        {items.map((item,index)=><div key={index} id="item">
          <div>{item.name}</div>
          <button onClick={()=>{deleteItem(item._id)}}>X</button>
        </div>)}
      </div>
    </div>

  );
}

export default App;