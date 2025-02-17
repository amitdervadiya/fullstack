import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Signuppage() {
      const [data, setData] = useState()
      const [name, setName] = useState()
      const [email, setEmail] = useState()
      const [password, setPassword] = useState()
      const navigate = useNavigate()

     
  const handlesubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:1008/registerAdmin",{
        name,
        email,
        password
    })
        .then((response) => {
            console.log(response.data)
            setData(response.data)
        })
        navigate('/login')
}


  return (
  <>
   <div>
            <form action="" onSubmit={handlesubmit}>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder='name' />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                <button type='submit'>
                    submit
                </button>
            </form>


        </div>
        </>
  )
}
