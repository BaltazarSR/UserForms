import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Login.css'

const Login = () => {

  const [form, setForm] = useState({
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

  return (
    <>
      <div className="container-main">
        <div className="container-log">
          <div className='container-text'>
            <div className="main-text">
              Welcome back
            </div>
            <div className='container-sub'>
              <div className='sub-text'>
                Don't have an account?
              </div>
              <div>
                <Link className='link-text' to="/register">Register </Link>
              </div>
            </div>
            <div className='container-input'>
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
              <button className='input-button'>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
