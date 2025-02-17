import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Loginpage from './Components/loginpage';
import Signuppage from './Components/signuppage';
import Mainpage from './Components/Mainpage';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Loginpage/>} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/mainpage" element={<Mainpage />} />
        </Routes>
     
    </BrowserRouter>
    </>
  )
}

export default App
