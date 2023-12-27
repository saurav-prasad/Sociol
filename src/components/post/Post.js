import React, { useEffect, useState } from 'react'
import PostCard from '../postCard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { post } from '../../axios'
import { createPost } from '../../features/post/postSlice'
import sortArray from '../../sortArray'

function Post() {
    const dispatch = useDispatch()
    const [postsData, setPostsData] = useState([])
    const posts = useSelector(state => state.postReducer)

    useEffect(() => {
        async function fetchUser() {
            console.log("object");
            let fetchPosts = await post.get('/getallpost')
            fetchPosts = sortArray(fetchPosts.data.data)
            setPostsData(fetchPosts)
            dispatch(createPost(fetchPosts))
        }
        fetchUser()
    }, [])

    return (
        <div className='max-w-lg mx-auto'>
            {
                postsData.map(data =>
                    <PostCard
                        profilePhoto={data.profilePhoto}
                        username={data.username}
                        about={data?.about}
                        profileId={data.profileId}
                        id={data.id}
                        image={data?.image}
                        text={data?.text}
                        like={data?.like} />
                )
            }
        </div>
    )
}

export default Post