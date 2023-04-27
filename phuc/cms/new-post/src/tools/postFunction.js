import axios from 'axios';

export const getPostInfo = (id, successCallback, failCallback) =>{
    console.log("mew!!")
    axios({
        method:"GET",
        url: "http://127.0.0.1:8000/blog/posts/"+id+"/",
        headers:{
            'Authorization': 'token ' + localStorage.token,
        }
    }).then(function (response) {
        if (successCallback) 
        successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
        failCallback(response);
    })
}

export const getPostContent = (id, successCallback, failCallback) => {
    axios({
        method:"GET",
        url: "http://127.0.0.1:8000/blog/post-content/",
        params: {
            post: id,
        },
        headers:{
            'Authorization': 'token ' + localStorage.token,
        }
    }).then(function (response) {
        if (successCallback) 
        successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
        failCallback(response);
    })
}

export const updatePostInfo = (id, values, successCallback, failCallback) => {
    axios({
        method:"PATCH",
        url: "http://127.0.0.1:8000/blog/posts/"+id+"/",
        data: values,
        headers:{
            'Authorization': 'token ' + localStorage.token,
        }
    }).then(function (response) {
        if (successCallback) 
        successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
        failCallback(response);
    })
}

export const updatePostContent = (postId, values, successCallback, failCallback) => {
    axios({
        method:"PATCH",
        url: "http://127.0.0.1:8000/blog/post-content/"+postId+"/",
        data: values,
        headers:{
            'Authorization': 'token ' + localStorage.token,
        },
    }).then(function (response) {
        if (successCallback) 
        successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
        failCallback(response);
    })
}

export const createPostInfo = (values, successCallback, failCallback) => {
    axios({
        method: "POST",
        url: "http://127.0.0.1:8000/blog/posts/",
        headers:{
            'Authorization': 'token ' + localStorage.token,
        },
        data: values,
    }).then(function (response) {
        if (successCallback) 
            successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
            failCallback(response);
    })
}

export const createPostContent = (postId, successCallback, failCallback) => {
    axios({
        method: "POST",
        url: "http://127.0.0.1:8000/blog/post-content/",
        headers:{
            'Authorization': 'token ' + localStorage.token,
        },
        data:{
            post: postId,
        },
    }).then(function (response) {
        if (successCallback) 
            successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
            failCallback(response);
    })
}