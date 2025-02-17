import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Loginpage() {
    const [data, setData] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handlesubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:1008/login",{
            name,
            email,
            password
        })
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
    }

    return (
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
    )
}
