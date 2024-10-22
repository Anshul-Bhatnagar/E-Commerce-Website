import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = ({setIsLoggedIn}) => {
  const [formData,setFormData] = useState({'email': '',
    'password': '',
  })

  const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.name] :e.target.value,
      })
  }

  const Navigate = useNavigate();

  const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const response = await axios.post('http://localhost:5000/login', formData);
        const token = response.data.token;
        localStorage.setItem("authToken",token);
        alert('login sucessfully');
        console.log(response.data);
        setIsLoggedIn(true)
        Navigate('/Home')
        
      }
      catch(error){

           alert('password galat hai ya email galat hai');
           console.error('error aayi hai ye', error);
           

      }

  }


    return (
      
        <div className='main'>
        <form className='form1' onSubmit={handleSubmit}>
            <div className='first-label'>
                <label>email:</label>
                <input type='email' name='email' value={formData.email} onChange={handleChange} required />


                
            </div>
            <div className='secondlabel'>
            <label>password:</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} required />

            </div>

            <button  className='btn1'  type='submit'>Login</button>
            <button  className='btn2' onClick={() => Navigate('/')}>Go To Signup</button>
        </form>
       
            
        </div>
        
    );
}

export default Login;
