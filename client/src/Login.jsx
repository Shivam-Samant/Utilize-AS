import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:8000'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/login`, {
                    email,
                    password
            })
            if (response.data) {
                console.log({
                    responseData: response.data
                })
                localStorage.setItem("token", response?.data?.data?.token)
                navigate('/orders')
            } else {
                alert("Some error while processing data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login