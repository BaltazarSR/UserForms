import React from 'react'
import { useState } from 'react';

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
      <div>Register</div>
      <label>
        First Name:
        <input 
          type="text" 
          name='firstName'
          onChange={handleChange}
          value={form.firstName}
        />
      </label>
      <label>
        Last Name:
        <input 
          type="text" 
          name='lastName'
          onChange={handleChange}
          value={form.lastName}
        />
      </label>
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

export default Register