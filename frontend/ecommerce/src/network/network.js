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

//Get Products

export async function getProducts(token){
    const url = "http://localhost:3001/products";

    try{
        
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(res.status === 200){
            // console.log("res.data:-------", res.data);
            return res.data;
        }

    }
    catch(err){
        console.error(err);
      
        return null;

    }

}

// get user by ID

export async function getUserName(userId){

    const url = "http://localhost:3001/users";

    try{

        const res = await  axios.get(`${url}/${userId}`)
        console.log(res.data)
        return res.data;
    }
    catch(error){
        console.error("Error fetching user from id", error);
        return null;

    }
}

export async function getAllOrders(token){
    const url = "http://localhost:3001/orders/order";
    try{


        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data
    }
    catch(error){
    console.error ("Error getting orders", error)
    return null;
    }

}