import { useState, useEffect } from 'react'
import './App.css'
import { authFlow, getDataAuth } from './setup'
import { getToken } from './getToken'
import { useNavigate } from 'react-router'
import { spotifyAPI } from './api/spotifyAPI.js';

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const handleSetup = async() => {
    const code = await getDataAuth();
    authFlow(code);
  }

  const handleGetToken = () => {
    getToken()
    navigate('/dashboard');
  }

  const getUsers = async() => {
    const url = "http://localhost:3000/api/users";
    const res = await spotifyAPI(url, 'GET', null);
    console.log(res);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div className='container-main'>
        <div className="container-log">
          <h1 className='main-text'>Welcome</h1>
          <div className='container-text'>
            <button className='input-button' onClick={handleSetup}>Start Setup</button>
            <button className='input-button' onClick={handleGetToken}>Get Token</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
