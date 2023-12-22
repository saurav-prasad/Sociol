import React from 'react'
import PostCard from '../postCard/PostCard'
import { Power } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    return (
        <div className='max-w-xl mx-auto'>
            {/* Profile page header */}
            <div className='sm:hidden flex flex-row justify-between items-center px-2 py-1 mb-5 border-b bg-white'>
                <h1 className='w-full text-left font-bold text-3xl font-[Whisper]'>Sociol</h1>
                <div>
                    <Power strokeWidth={3} className='' />
                </div>
            </div>
            {/* Profile infos */}
            <div className='sm:pt-8 max-w-xl mx-auto px-2 sm:border-b sm:pb-6'>
                <div className=' flex flex-row justify-start'>
                    {/* profile info */}
                    <div className='flex shrink-0 justify-center items-center mr-3 md:mr-12'>
                        <img className="md:h-40 md:w-40 h-28 w-28 rounded-full border border-y-purple-600 border-x-violet-500 object-cover"
                            src='https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703829600&v=beta&t=HramxGi8yFg0kn5pAZaeu_4hSID3cwCpfjszSUcN1BM'
                            alt='profile' />
                    </div>
                    {/* Profile name and follow button */}
                    <div className='flex flex-col w-full space-y-3'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-xl font-normal'>
                                Saurav
                            </h1>
                            <button
                            onClick={()=>{navigate('/profile/update')}}
                                type="button"
                                className="h-7 rounded-md bg-sky-500  px-5 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                            >
                                Edit
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
                            <div className=''>
                                <p className='font-medium text-left text-base text-zinc-950'>
                                    Saurav Prasad
                                </p>
                                <p className='text-sm text-left text-zinc-950'>
                                    Frontend developer
                                </p>
                            </div>
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
            <div className='flex flex-col mt-7 px-2 sm:px-6'>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}

export default Profile