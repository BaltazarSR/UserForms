import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { authFlow, getDataAuth } from './setup'
import { getToken } from './getToken'

function App() {
  const [count, setCount] = useState(0)

  const handleSetup = async() => {
    const code = await getDataAuth();
    authFlow(code);
  }

  const handleGetToken = () => {
    getToken()
  }

  return (
    <>
      <h1>Hola Mundo</h1>
      <button onClick={handleSetup}>Start Setup</button>
      <button onClick={handleGetToken}>Get Token</button>
    </>
  )
}

export default App
