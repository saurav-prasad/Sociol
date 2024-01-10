import React, { useEffect, useState } from 'react'
import PostCard, { PostCardSkeleton } from '../postCard/PostCard'
import { useSelector } from 'react-redux'
import sortArray from '../../functions/sortArray'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

function Post() {

    const [postsData, setPostsData] = useState([])
    const posts = useSelector(state => state.postReducer)
    useEffect(() => {
        const a = sortArray(posts)
        setPostsData(a)
    }, [posts])

    return (
        <>
            <div className='max-w-lg mx-auto'>
                {
                    postsData ?
                        postsData.map(data =>
                            <PostCard
                                profilePhoto={data.profilePhoto}
                                username={data.username}
                                about={data?.about}
                                profileId={data.profileId}
                                id={data.id}
                                postKey={data.key}
                                image={data?.image}
                                text={data?.text}
                                like={data?.like}
                                key={data.key}
                                timestamp={data.timestamp}
                                comment={data.comment}
                            />
                        ) :
                        <PostCardSkeleton />
                }
            </div>
        </>
    )
}


export default Post