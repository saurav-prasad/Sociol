import React from 'react'
import PostCard from '../postCard/PostCard'

function Post() {
    return (
        <div className='max-w-md mx-auto'>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    )
}

export default Post