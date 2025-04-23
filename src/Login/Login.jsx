import React from 'react'
import { useState } from 'react';

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
      <div>Welcome back</div>
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
    </>
  )
}

export default Login
