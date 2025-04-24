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
          <div className="main-text">
            Welcome back
          </div>
          <div>
            <div>
              Don't have an account?
            </div>
            <div>
              <Link to="/register">Register </Link>
            </div>
          </div>
          <label>
            Email:
            <input 
              type="email" 
              name='email'
              onChange={handleChange}
              value={form.email}
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              name='password'
              onChange={handleChange}
              value={form.password}
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default Login
