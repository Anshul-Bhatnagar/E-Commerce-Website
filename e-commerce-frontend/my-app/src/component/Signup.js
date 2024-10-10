import React, { useState } from 'react';
import axios from 'axios';
//import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'



const Signup = ({setIsLoggedIn}) => {

    const [formData,setFormData] = useState({"username": '',
        "email":'',
        "password":'',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/register',formData);
            alert('user registered successfully');
            console.log(response.data);
            setIsLoggedIn(true);
            navigate('/Home');

            
        }

        catch(error){
            alert('use another email and usename')
            console.error('error registering user' , error);
            
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username:</label>
                    <input type = "text" name="username" value={formData.username} onChange={handleChange} required />


                </div>
                <div>
                    <label>email:</label>
                    <input type = "email" name="email" value={formData.email} onChange={handleChange} required />
                    

                </div>
                <div>
                    <label>password:</label>
                    <input type = "password" name="password" value={formData.password} onChange={handleChange} required />
                    

                </div>
                <button type='submit'>sign up</button>

                <button onClick={() => navigate('/login')}>Go to Login</button>
            </form>
        </div>
    );
}

export default Signup;
