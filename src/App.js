import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemForm from './component/ItemForm';
import ItemList from './component/ItemList';
import axios from 'axios';
import { useState } from 'react';

const URL = "https://full-stack-crud-server.onrender.com/api/"
function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [items, setItems] = useState([]);
  const getAllItems = async () => {
    const response = await axios.get(`${URL}/items`);
    const items = response.data;
    setItems(items);
  }
  return (
    <div className='d-flex container-xxl p-5' style={{marginTop:'100px'}}>
      <ItemForm getAllItems={getAllItems} isEdit={isEdit} editData={editData} setEditData={setEditData} setIsEdit={setIsEdit}/>
      <ItemList getAllItems={getAllItems} items={items} setEditData={setEditData} setIsEdit={setIsEdit}/>
    </div>
  );
}

export default App;
