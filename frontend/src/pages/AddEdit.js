import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';

const state = {
  name: "",
  email: "",
  contact: "",
};


const AddEdit = () => {
const [state, setState] = useState(state);

const {name , email , contact} = state;

const history = useHistory();

const { id } = useParams();

useEffect(() => {
  if (id) {
    getSingleUser(id);
  }
}, [id]);

const getSingleUser = async (id) => {
  const response = await axios.get(`http://localhost:5000/user/${id}`);
  if(response.status === 200) {
    setState({ ...response.data[0] });
  }
};

const handleInputChange = (e) => {
  let { name, value } = e.target;
  setState({
    ...state, 
    [name]: value,
  });
};

const addUser = async (data) => {
  const response = await axios.post("http://localhost:5000/user",data);
  if(response.status === 200) {
    toast.success(response.data);
  }
};

const updateUser = async (data,id) => {
  const response = await axios.put(`http://localhost:5000/user/${id}`,data);
  if(response.status === 200) {
    toast.success(response.data);
  }
};

const handleSubmit = (e) => {
  e.prevenDefault();
  if(!name || !email || !contact) {
    toast.error("Please enter a valide input !");
  } else {
    if (!id) {
        addUser(state);
    } else {
        updateUser(state, id);
    }
    
  setTimeout(() => history.push("/"), 500);
}

};
  return (
    <div style={{marginTop: "100px"}}>
      <form style={
        {
          margin: "auto",
          padding: "150px",
          maxwidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
        >
        <label htmlFor='name'>Name</label>
        <input 
        type="text" 
        id="name" 
        name="name" 
        placeholder="Enter Your Name ..." 
        onChange={handleInputChange} 
        value={name}
        />

        <label htmlFor='email'>Email</label>
        <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="Enter Your Email ..." 
        onChange={handleInputChange} 
        value={email}
        />
        <label htmlFor='contact'>Contact</label>
        <input 
        type="number" 
        id="contact" 
        name="contact" 
        placeholder="Enter Your No ..." 
        onChange={handleInputChange} 
        value={contact}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  )

}
export default AddEdit;