import { MoreHorizontal } from 'lucide-react';
import React from 'react'

const timePassed = (timestamp,) => {
    const startDateTime = new Date(timestamp);
    const currentDateTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDateTime - startDateTime;

    // Convert milliseconds to seconds, minutes, hours, days, months, and years
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30); // Assuming a month has approximately 30 days
    const totalYears = Math.floor(totalDays / 365); // Assuming a year has approximately 365 days

    // Determine the appropriate unit and value
    let formattedTime;
    if (totalSeconds < 60) {
        formattedTime = `${totalSeconds} sec${totalSeconds !== 1 ? 's' : ''}`;
    } else if (totalMinutes < 60) {
        formattedTime = `${totalMinutes} min${totalMinutes !== 1 ? 's' : ''}`;
    } else if (totalHours < 24) {
        formattedTime = `${totalHours} hr${totalHours !== 1 ? 's' : ''}`;
    } else if (totalDays < 30) {
        formattedTime = `${totalDays} dy${totalDays !== 1 ? 's' : ''}`;
    } else if (totalMonths < 12) {
        formattedTime = `${totalMonths} mo${totalMonths !== 1 ? 's' : ''}`;
    } else {
        formattedTime = `${totalYears} yr${totalYears !== 1 ? 's' : ''}`;
    }
    return formattedTime
}

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