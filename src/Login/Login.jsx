import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { spotifyAPI } from '../api/spotifyAPI';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'
import { authFlow, getDataAuth } from '../setup'

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleSetup = async() => {
    const code = await getDataAuth();
    authFlow(code);
    setAuthorized(true);
  }

  const handleLogIn = async () => {
    const email = form.email;
    try {
      const url1 = `http://localhost:3000/api/users/password/${email}`
      const password = await spotifyAPI(url1, "GET", null, null);
      const passwordString = password[0].password.toString();
      if (passwordString === form.password) {
        const url2 = `http://localhost:3000/api/users/mail/${email}`;
        const result = await spotifyAPI(url2, "GET", null, null);
        const userId = result[0].id.toString();
        localStorage.setItem("UserId", userId)
        await handleSetup();
        navigate("/setup");
      } else {
        throw new Error("Incorrect password");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

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
              <button className='input-button' onClick={handleLogIn}>
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
