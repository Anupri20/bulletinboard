import axios from "axios";
export const LOGIN="LOGIN";
export const GET_POSTS="GET_POSTS";
export const GET_SPOST="GET_SPOST";
export const EDIT_POST="EDIT_POST";
export const GET_COMMENTS="GET_COMMENTS";


export const login=(payload)=>{
    return{
        type:LOGIN,
        payload:payload
    }
}
export const getposts=()=>{
    return async function(dispatch){
        axios.get('https://localhost:7216/api/Post')
        .then(function (response) {
          console.log(response);
          dispatch({
            type:GET_POSTS,
            payload:response.data
        })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
   
}
export const getspost=(pid)=>{
    return async function(dispatch){
        axios.get(`https://localhost:7216/api/Post/post ${pid}`)
        .then(function (response) {
            console.log(response);
            dispatch({
                type:GET_SPOST,
                payload:response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
export const editPost=(postObject)=>{

    return async function(dispatch){
    axios.put('https://localhost:7216/api/Post',postObject)
        .then(response => {
          console.log(response);
          dispatch({
            type:EDIT_POST,
            payload:response.data
          })
        })
        .catch(error => {
          console.error(error);
        });
    }
}
export const getComments=()=>{
    return async function(dispatch){

    }
}