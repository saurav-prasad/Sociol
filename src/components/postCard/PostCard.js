import React, { useState } from 'react'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import sliceString from '../../sliceString';
import { Fade, Zoom } from "react-awesome-reveal";

function PostCard() {
    const [more, setMore] = useState(false)
    return (
        <div className="flex flex-col rounded-lg py-2 border bg-white mb-10 ">
            {/* user details */}
            <div className='flex items-center justify-start px-3 mb-3'>
                <img class="inline-block h-10 w-10 object-cover rounded-full border bg-gradient-to-r from-purple-500 to-pink-500"
                    src="https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703829600&v=beta&t=HramxGi8yFg0kn5pAZaeu_4hSID3cwCpfjszSUcN1BM" alt="" />
                <div className='flex ml-2 flex-col justify-center items-sart'>
                    <p className=' text-left text-md font-semibold'>Saurav</p>
                    <span className='text-left text-xs text-zinc-600'>Frontend developer</span>
                </div>
            </div>
            {/* Post text */}
            <div className='text-left mb-3 px-3 transition-all text-md antialiased leading-8'>
                {
                    sliceString(`For most of the year, we thought 2023 was the hardest year for us at leap.club but now looking back, we feel it was the best year, as it taught us so much. We missed our year end target, and as founders and founding team members, we will continue to aim for more. `, more ? 0 : 150)
                }
                {<span onClick={() => { setMore(!more) }} className='select-none cursor-pointer text-xs p-1'>&nbsp;&nbsp; Read {more ? 'less' : 'more'}</span>}

            </div>
            {/* Post image */}
            <Fade duration={200} direction='top' triggerOnce={true}>
                <img
                    src="https://media.licdn.com/dms/image/D5622AQFnFsyjB-B_Pw/feedshare-shrink_2048_1536/0/1703221649492?e=1706140800&v=beta&t=Zxqj4vP83RhUN-6p7kJlXKOFZyE9abdKm1lXGWBcs5Q"
                    alt="Post"
                    className="h-auto w-full object-contain"
                />
            </Fade>
            {/* Like and comment */}
            <div className='flex justify-around mt-3 border-y'>
                <div className='select-none p-2 flex items-center cursor-pointer text-blue-600'>
                    <ThumbUpRoundedIcon fontSize='medium' className='scale-x-[-1]' />
                    <span className='font-medium ml-1 text-sm'>Like</span>
                </div>

                <div className='select-none p-2 flex items-center cursor-pointer  text-zinc-500'>
                    <CommentRoundedIcon fontSize='medium' className='' />
                    <span className='font-medium text-sm ml-1'>Comment</span>
                </div>
            </div>
            {/* total likes */}
            <div className='flex flex-col px-2 mt-3'>
                <span className='w-full text-left text-base font-semibold text-slate-700'>56
                    <span className='text-base font-medium ml-2 text-slate-500'>Likes</span>
                </span>
            </div>
            {/* write a comment */}
            <div className='flex mt-3 flex-row items-start px-2'>
                <div className='mr-2 flex-shrink-0'>
                    <img
                        className='rounded-full w-10 h-10'
                        src="https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703768400&v=beta&t=HGBJKIZQdj5kBdKi4cf1ISDngldbLcMeR3gu6SzYhIw" alt="" />
                </div>
                <div className='w-full flex flex-col'>
                    <textarea
                        className='w-full border-b outline-0 text-base'
                        placeholder='Add a comment' name="" id="" cols="30" rows="2"></textarea>
                    <div className='flex justify-between mt-2'>
                        <button
                            type="button"
                            className="h-7 rounded-md border border-black px-3 py-1 text-xs font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="h-7 rounded-md bg-sky-500  px-5 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            {/* comments */}
            <div className='flex mt-3 flex-row items-start px-2'>
                <div className='mr-2 flex-shrink-0'>
                    <img
                        className='rounded-full w-10 h-10'
                        src="https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703768400&v=beta&t=HGBJKIZQdj5kBdKi4cf1ISDngldbLcMeR3gu6SzYhIw" alt="" />
                </div>
                <div className='w-full '>
                    <p className='text-left text-slate-800'>
                        <span className='text-left mr-2 font-medium text-slate-900'>Saurav</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aspernatur earum nostrum omnis minima quae incidunt nobis blanditiis sed maxime?
                    </p>
                </div>
            </div>
        </div>
    )
}


export default PostCard