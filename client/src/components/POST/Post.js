import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getPost(id));
        }
    }, [dispatch, id]);

    const { post, loading } = useSelector(state => state.post);

    if (loading || post === null) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Link to={'/posts'} className='btn'>
                Back</Link>
            <PostItem post={post} showAction={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
                {post?.comments?.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

export default Post;
