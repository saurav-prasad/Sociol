import React from 'react'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

function Post() {
    return (
        <div className="flex flex-col max-w-md rounded-md mx-auto py-2 border bg-white mb-10 ">
            {/* user details */}
            <div className='flex items-center justify-start px-3 mb-3'>
                <img class="inline-block h-12 object-cover w-12 rounded-full border bg-gradient-to-r from-purple-500 to-pink-500"
                    src="https://scontent.cdninstagram.com/v/t39.30808-6/411117180_18401964661006330_5999756429314918776_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gD2e-uhIfYMAX_Nd21r&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI1ODM3NzE1NzY3MTI3NDY2Nw%3D%3D.2-ccb7-5&oh=00_AfAZ-tSxWb9vjgAgShNTfa1wJke7ky9IK6L4AQBpgcMqmQ&oe=6585C199&_nc_sid=10d13b" alt="" />
                <p className='ml-2 text-md font-semibold'>Saurav</p>
            </div>
            {/* Post text */}
            <p className='text-left mb-3 px-3 text-md antialiased'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, repellendus corrupti tenetur beatae qui earum quia impedit voluptatem incidunt consequuntur possimus voluptates. Impedit, minima?
            </p>
            {/* Post image */}
            <img
                src="/images/bmw.jpg"
                alt="Post"
                className=" w-full object-cover"
            />
            {/* Like and comment */}
            <div className='flex justify-around mt-2'>
                <div className='select-none flex items-center cursor-pointer text-blue-600'>
                    <ThumbUpRoundedIcon fontSize='medium' className='scale-x-[-1]' />
                    <span className='font-medium ml-1 text-sm'>Like</span>
                </div>

                <div className='select-none flex items-center cursor-pointer  text-zinc-500'>
                    <CommentRoundedIcon fontSize='medium' className='' />
                    <span className='font-medium text-sm ml-1'>Comment</span>
                </div>
            </div>
        </div>
    )
}


export default Post