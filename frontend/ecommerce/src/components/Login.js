import {useState} from 'react';
import { login } from '../network/network'; 
import { useNavigate } from 'react-router-dom';

export default function Login(e){
    
    const [newLogin, setNewLogin] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleLogin = async (e)=> {
        e.preventDefault();
    
        try{
        const res = await login(newLogin.email, newLogin.password);
    
        console.log("token: ", res.token)
        if(res.data.token){
            localStorage.setItem("token", res.data.token);
            navigate('/home')

        }
        }
        catch(err){
            console.error(err);
        }

    }
    const setLoginDetails = (e) => setNewLogin({...newLogin, [e.target.name]: e.target.value})

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            <input placeholder="email" type="email" name='email' onChange={setLoginDetails}/>
            <input placeholder="password" type="password" name='password' onChange={setLoginDetails}/>
            <input type="submit" value= "login" />
            </form>
        </div>
    )
}
