import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

//signup

export async function signup(name, email, password){
    const url = "http://localhost:3001/signup";

    try{
        const res = await axios.post(url,{name, email, password});
        return res.data;
    }
    catch(error){
        console.log("error occurred on signup")
        return; 
    }
}

//login
export async function login (email, password){
    const url = "http://localhost:3001/login";

    try{
        const res = await axios.post(url, {email, password});
        return res.data;

    }
    catch(err){
        console.error(err);
        return;
    }
}