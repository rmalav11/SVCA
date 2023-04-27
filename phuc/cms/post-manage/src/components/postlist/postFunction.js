import axios from 'axios';

export const getAllPost = (successCallback, failCallback) =>{
    axios.get('http://127.0.0.1:8000/blog/posts/',{
        headers: {
            'Authorization': 'token ' + localStorage.token
        }
    }).then(function (response) {
        if (successCallback)
            successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
            failCallback(response);
    })
}

export const getPaginatedPost = (params, successCallback, failCallback) => {
    console.log(params);
    axios.get('http://127.0.0.1:8000/blog/posts/',{
        params:{
            current: params.pagination.current,
            pageSize: params.pagination.pageSize,
        },
        headers: {
            'Authorization': 'token ' + localStorage.token
        }
    }).then(function (response) {
        if (successCallback)
            successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
            failCallback(response);
    })
}

export const updatePostPublic = (id, publicState, successCallback, failCallback) => {
    axios({
        method:'PATCH',
        url:'http://127.0.0.1:8000/blog/posts/'+id+'/',
        headers: {
            'Authorization': 'token ' + localStorage.token
        },
        data: {
            public: publicState,
        }
    }).then(function (response) {
        if (successCallback)
            successCallback(response.data);
    }).catch(function (response) {
        if (failCallback)
            failCallback(response);
    })
}