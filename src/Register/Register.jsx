import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Register.css'

const Register = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
                    name='firstName'
                    onChange={handleChange}
                    value={form.firstName}
                    placeholder='First Name'
                  />
                </label>
                <label className='input-box-half'>
                  <input 
                    type="text" 
                    name='lastName'
                    onChange={handleChange}
                    value={form.lastName}
                    placeholder='Last Name'
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
              <button className='input-button'>
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