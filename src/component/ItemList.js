import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://full-stack-crud-server.onrender.com/api/"

function ItemList({ getAllItems, items, setEditData, setIsEdit }) {
    useEffect(() => {
        getAllItems();
    }, []);
    const handleDelete = async (item) => {
        const id = item._id;
        try {
            await axios.delete(`${URL}/items/${id}`);
            getAllItems();
        } catch (error) {
            console.log("Error while calling delete item api");
        }
    }
    const handleEdit = (item) => {
        setEditData(item);
        setIsEdit(true);
    }
    const handleAddItem = () => {
        setEditData({});
        setIsEdit(false);
    }
    return (
        <>
            <div className="flex-grow-1">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col" colspan="2">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 && items.map((itm, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{itm.title}</td>
                                <td>{itm.description}</td>
                                <td>
                                    <button className="btn btn-outline-success" onClick={() => handleEdit(itm)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(itm)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ItemList