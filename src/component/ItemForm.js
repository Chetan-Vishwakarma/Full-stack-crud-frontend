import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://full-stack-crud-server.onrender.com/api/"

function ItemForm({ getAllItems, isEdit, editData, setEditData, setIsEdit }) {
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const addItem = async () => {
        try {
            await axios.post(`${URL}/items`, formData);
            setFormData({ title: "", description: "" });
            getAllItems();
        } catch (error) {
            console.log("Error while calling add item api", error);
        }
    }
    const editItem = async () => {
        try {
            await axios.put(`${URL}/items/${formData?._id}`, formData);
            setFormData({ title: "", description: "" });
            setEditData({});
            setIsEdit(false);
            getAllItems();
        } catch (error) {
            console.log("Error while calling add item api", error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title !== "" && formData.description !== "") {
            setIsError(false);
            if (isEdit && editData) {
                editItem();
            } else {
                addItem();
            }
        } else {
            setIsError(true);
            // alert("All fields are required")
        }
    }
    useEffect(() => {
        if (Boolean(isEdit)) {
            setFormData(editData);
        } else {
            setFormData({
                title: "",
                description: ""
            });
        }
    }, [isEdit, editData]);
    return (
        <>
            <form onSubmit={handleSubmit} className="flex-grow-1 me-5">
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" onChange={handleChange} className="form-control" id="title" name="title" value={formData.title} />
                    {(isError&&formData.title==="")? <p className="text-danger">This field is required</p>:""}
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" onChange={handleChange} className="form-control" name="description" id="description" value={formData.description} />
                    {(isError&&formData.description==="")? <p className="text-danger">This field is required</p>:""}
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-primary">{isEdit?"Update":"Submit"}</button>
                </div>
            </form>
        </>
    )
}

export default ItemForm