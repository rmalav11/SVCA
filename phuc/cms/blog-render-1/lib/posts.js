import axios from "axios";


export async function getAllPublicPost() {
    try{
        const response = await axios({
            method: "GET",
            url: "http://127.0.0.1:8000/blog/posts/",
        })
        return response;
    } catch (error){
        return error;
    }
    
}