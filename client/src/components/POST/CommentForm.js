import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, addPosts } from '../../actions/post';

const CommentForm = ({ postId }) => {
    const [text, setText] = useState(' ')
    const dispatch = useDispatch();

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Add your comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                dispatch(addComment({ text }, postId));
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm
