import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date } }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)



    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar || '//www.gravatar.com/avatar/?d=mm&s=200&r=pg'}
                            alt="avatar"
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {!auth?.loading && user === auth?.user?._id && (
                        <button onClick={e => dispatch(deleteComment(postId, _id))} className='btn' type='button'>
                            <i className='fas fa-times'>
                                delete
                            </i>
                        </button>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default CommentItem
