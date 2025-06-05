import './App.css';
import {useState} from 'react';

function App() {

  const [items, setItems]= useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if(value.trim() === '') return;
    if(editIndex === -1)
    {
      setValue(value.trimStart());
      setItems([...items, value]);
    }
    else{
      const newItems = [...items];
      newItems[editIndex] = value.trim();
      setItems(newItems);
      setEditIndex(-1);
    }
    setValue("");
  }

  const handleEdit = (index) =>{
    setEditIndex(index);
    setValue(items[index]);
  }
  const handleDelete = (index) =>{
    const allow = window.confirm("Are You Sure You Want To Delete " + items[index] +"?");
    if(!allow) return;
    const newItems = items.filter((item, i) => index !== i)
    setItems(newItems);
    if(editIndex === index)
    {
      setEditIndex(-1);
      setValue("");
    }
    setMessage("Deleted successfully!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <div className="App">
      <div>ToDoList<div><img src="./todologo.png" alt="Logo" className="logo"/></div></div>
      <div>
        <form method="GET" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="item"
            id="item" 
            value={value} 
            onChange={(data) => setValue(data.target.value)} 
            placeholder="Enter Item Here"/>
          <input type="submit" name="submit" value={editIndex === -1 ? "Add Item" : "Update Item"}/>
        </form>
      </div>
      {message && <div className="message">{message}</div>}
      <div>
        <div><header>List Items ({items.length})</header></div>
        <div>
          <ul>
          {
            items.map((item, index) => (
              <li key={index}>
                {item}{"  "}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
