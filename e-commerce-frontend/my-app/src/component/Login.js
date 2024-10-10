import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

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
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>email:</label>
                <input type='email' name='email' value={formData.email} onChange={handleChange} required />


                
            </div>
            <div>
            <label>password:</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} required />

            </div>

            <button type='submit'>Login</button>
        </form>
        <button onClick={() => Navigate('/')}>Go To Signup</button>
            
        </div>
    );
}

export default Login;
