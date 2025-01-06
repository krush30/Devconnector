import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_ALERT, REMOVE_COMMENT, UPDATE_LIKES } from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}

}

const postReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        //when GET_POSTS receives data from action as payload then it is stored in 
        // posts now when we implement respected action for GET_POSTS in our Files
        // we get data in post redux state because we store it in name of that and 
        // when we access it using useSelector the is loaded in posts
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    payload,
                    ...state.posts
                ],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                // Checking id of post with payload post to see if they match and if they match then we will return the likes in payload
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false

            }
        case REMOVE_COMMENT:
            //see this again
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        default:
            return state
    }
}

export default postReducer;