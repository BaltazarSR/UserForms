import { useEffect, useRef } from 'react'
import './App.css'
import { getToken } from './getToken'
import { useNavigate } from 'react-router'
import { spotifyAPI } from './api/spotifyAPI.js';

function App() {

  const navigate = useNavigate();

  const hasRun = useRef(false);

  const handleGetToken = async() => {
    await getToken();
    navigate("/dashboard");
  }

useEffect(() => {
  if (!hasRun.current) {
    hasRun.current = true;
    handleGetToken();
  }
}, []);

  return (
    <>
      <div className='container-main'>
        <div className="container-log-setup">
          <h1 className='main-text'>Wait for spotify connection</h1>
          {/* <div className='container-text'>
            <button className='input-button' onClick={handleSetup}>Start Setup</button>
            <button className='input-button' onClick={handleGetToken}>Get Token</button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default App
