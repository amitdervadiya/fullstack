import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Loginpage from './Components/loginpage';
import axios from 'axios';
import Mainpage from './Components/Mainpage';
import Signuppage from './Components/Signuppage';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Signuppage/>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/mainpage" element={<Mainpage />} />
        </Routes>
     
    </BrowserRouter>
    </>
  )
}

export default App
