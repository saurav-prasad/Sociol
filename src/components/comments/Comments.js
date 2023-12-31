import { MoreHorizontal } from 'lucide-react';
import React from 'react'
import timePassed from '../../functions/timePassed';



function Comments({ profilePhoto, username, commentText, commentId, timestamp }) {
    return (
        <div className='flex flex-row items-start px-2'>
            <div className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full cursor-pointer w-8 h-8 object-cover'
                    src={profilePhoto} alt={username} />
            </div>
            <div className='w-full bg-[#fbfaf8] rounded px-3 py-2'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <span className='text-left mr-2 font-semibold cursor-pointer text-slate-900'>{username}</span>
                    <div className='flex flex-row items-center justify-between'>
                        <span className='text-xs font-medium ml-2 text-slate-500'>{timePassed(timestamp)}</span>
                        <MoreHorizontal />
                    </div>
                </div>
                <p className='text-left text-slate-800'>
                    {commentText}
                </p>
            </div>
        </div>
    )
}

export default Comments