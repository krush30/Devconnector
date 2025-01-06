import axios from "axios"
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "./types"
import { setAlert } from "./alert"



// Get all posts
export const getPosts = () => async dispatch => {
    try {
        //Here we are making req to our backend route http://localhost:5000/api/post
        //like post.get('http://localhost:5000/api/post') and data from that section will 
        // come inside res.data and we are sending it to GET_POSTS type now in reducer
        const res = await axios.get('http://localhost:5000/api/post')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add likes

export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Remove likes 

export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete Posts
export const deletePosts = (id) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: id
        })

        dispatch(setAlert('Post removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// ADD POST
export const addPosts = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/api/post`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


// Get post

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/post/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add Comment

export const addComment = (formData, postID) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/api/post/comment/${postID}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('COMMENT ADDED', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delet comment

export const deleteComment = (postID, commentID) => async dispatch => {

    try {
        const res = await axios.delete(`http://localhost:5000/api/post/comment/${postID}/${commentID}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentID
        })

        dispatch(setAlert('Comment removed', 'danger'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}