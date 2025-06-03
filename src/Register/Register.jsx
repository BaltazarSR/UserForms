import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { spotifyAPI } from '../api/spotifyAPI';
import './styles/Register.css'

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { value, name } = e.target;

    const newForm = {
        ...form,
        [name]: value,
    }
    setForm(newForm);
  };

  const handleRegistro = async() => {
    const url = "http://localhost:3000/api/users";
    console.log(form);
    const data = JSON.stringify(form);
    console.log(data);
    const res = await spotifyAPI(url, "POST", data, null);
    console.log(res);
  }

  return (
    <>
      <div className="container-main">
        <div className="container-log">
          <div className='container-text'>
            <div className="main-text">
              Create an account
            </div>
            <div className='container-sub'>
              <div className='sub-text'>
                Already have an account?
              </div>
              <div>
                <Link className='link-text' to="/login">Log in </Link>
              </div>
            </div>
            <div className='container-input'>
              <div className='container-name'>
                <label className='input-box-half'>
                  <input 
                    type="text" 
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                    placeholder='First Name'
                  />
                </label>
              </div>
              <label className='input-box'>
              <input 
                type="email"
                name='email'
                onChange={handleChange}
                value={form.email}
                placeholder='Email'
              />
              </label>
              <label className='input-box'>
                <input 
                  type="password" 
                  name='password'
                  onChange={handleChange}
                  value={form.password}
                  placeholder="Password"
                />
              </label>
              <button className='input-button' onClick={handleRegistro}>
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Register