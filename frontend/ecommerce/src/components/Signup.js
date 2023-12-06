import  { useState } from 'react';
import { signup } from '../network/network';
import {useNavigate} from "react-router-dom"


export default function Signup() {

    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const changeSignup = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(newUser.name, newUser.email, newUser.password);
            console.log("res", res);
            if(res.success){
                navigate('/login')
            }

        } catch (error) {
            console.log("error occurred");
            return null;
         };
}

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input type='text' name='name' placeholder='Name' onChange={changeSignup} />
                <input type='email' name='email' placeholder='email' onChange={changeSignup} />
                <input type='password' name='password' placeholder='password' onChange={changeSignup} />
                <input type='submit' value="signup" />
            </form>
        </div>
    );
}

