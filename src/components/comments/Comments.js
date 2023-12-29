import React from 'react'

function Comments({ profilePhoto, username, commentText,commentId }) {
    return (
        <div className='flex mt-3 flex-row items-start px-2'>
            <div className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full cursor-pointer w-10 h-10 object-cover'
                    src={profilePhoto} alt={username} />
            </div>
            <div className='w-full '>
                <p className='text-left text-slate-800'>
                    <span className='text-left mr-2 font-semibold cursor-pointer text-slate-900'>{username}</span>
                    {commentText}
                </p>
            </div>
        </div>
    )
}

export default Comments