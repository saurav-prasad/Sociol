import React from 'react'
import PostCard from '../postCard/PostCard'

function Profile() {
    return (
        <div className='max-w-xl mx-auto'>
            {/* Profile infos */}
            <div className=' max-w-xl mx-auto px-2'>
                <div className=' flex flex-row justify-start'>
                    {/* profile info */}
                    <div className='flex shrink-0 justify-center items-center mr-3 md:mr-12'>
                        <img className="md:h-40 md:w-40 h-32 w-32 rounded-full border border-y-purple-600 border-x-violet-500 object-cover"
                            src='https://scontent.cdninstagram.com/v/t39.30808-6/411117180_18401964661006330_5999756429314918776_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gD2e-uhIfYMAX_Nd21r&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI1ODM3NzE1NzY3MTI3NDY2Nw%3D%3D.2-ccb7-5&oh=00_AfAZ-tSxWb9vjgAgShNTfa1wJke7ky9IK6L4AQBpgcMqmQ&oe=6585C199&_nc_sid=10d13b'
                            alt='profile' />
                    </div>
                    {/* Profile name and follow button */}
                    <div className='flex flex-col w-full space-y-4'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-xl font-normal'>
                                Saurav
                            </h1>
                            <button
                                type="button"
                                className="h-7 rounded-md bg-sky-500  px-5 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                            >
                                Follow
                            </button>
                        </div>
                        {/* follower following posts */}
                        <div className='hidden md:flex flex-row justify-start space-x-11'>
                            <p className='font-semibold text-base text-gray-800'>
                                2250
                                <span className='text-base ml-2 font-normal text-zinc-800'>
                                    Posts
                                </span>
                            </p>
                            <p className='font-semibold text-base text-gray-800'>
                                24
                                <span className='text-base ml-2 font-normal text-zinc-800'>
                                    followers
                                </span>
                            </p>
                            <p className='font-semibold text-base text-gray-800'>
                                965
                                <span className='text-base ml-2 font-normal text-zinc-800'>
                                    following
                                </span>
                            </p>
                        </div>
                        <div className='flex flex-row justify-start'>
                            <p className='font-medium text-base text-zinc-950'>
                                Saurav Prasad
                            </p>
                        </div>
                        <div className='flex flex-row justify-start mt-4'>
                            <p className='font-[500] text-sm text-gray-900 text-left'>
                                Love❤ to click 📸
                                Passion💪 to code 👨‍💻
                            </p>
                        </div>
                    </div>
                </div>
                <div className='md:hidden flex flex-row justify-around py-2 mt-6 space-x-11 border-t border-b'>
                    <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                        2250
                        <span className='text-sm font-normal text-zinc-800'>
                            Posts
                        </span>
                    </p>
                    <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                        24
                        <span className='text-sm ml-2 font-normal text-zinc-800'>
                            followers
                        </span>
                    </p>
                    <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                        965
                        <span className='text-sm ml-2 font-normal text-zinc-800'>
                            following
                        </span>
                    </p>
                </div>
            </div>
            {/* Profile posts */}
            <div className='flex flex-col mt-5 px-2'>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}

export default Profile