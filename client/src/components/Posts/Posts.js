import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const Posts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts(), [dispatch])
    }, [dispatch])
    const posts = useSelector(state => state.post)
    console.log(posts, 'posts');
    const loading = posts?.loading;
    const post = posts?.posts

    return (loading ? <Spinner /> :
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i>Welcome to community
            </p>
            <div>
                {post.map(po => (<PostItem key={posts?._id} post={po} />))}
            </div>
        </Fragment>
    )
}

export default Posts;
