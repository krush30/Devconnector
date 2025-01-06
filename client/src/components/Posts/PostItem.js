import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date } }) => {
    const auth = useSelector(state => state.auth)

    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
                <div>
                    <Link to={"/profile"}>
                        <img
                            class="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p class="my-1">
                        {text}
                    </p>
                    <p class="post-date">
                        <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    <button type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-up"></i>
                        <span>{likes.length}</span>
                    </button>
                    <button type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    <Link to="post.html" class="btn btn-primary">
                        Discussion <span class='comment-count'>{comments.length}</span>
                    </Link>
                    {!auth?.loading && user === auth?.user._id && (
                        <button
                            type="button"
                            class="btn btn-danger"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    )}
                    <button
                        type="button"
                        class="btn btn-danger"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default PostItem
