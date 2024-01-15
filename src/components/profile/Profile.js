import React, { useEffect, useState } from 'react'
import PostCard, { PostCardSkeleton } from '../postCard/PostCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import sortArray from '../../functions/sortArray'
import { Slide, Zoom } from 'react-awesome-reveal'
import ProfileHeader from '../profileHeader/ProfileHeader'
import { follow } from '../../axios/axios'
import Skeleton from 'react-loading-skeleton'
import { updateUser } from '../../features/auth/authSlice'

function Profile() {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postReducer)
    const dispatch = useDispatch()
    const [postsData, setPostsData] = useState([])
    const [followers, setFollowers] = useState(user?.followers)
    const [followings, setFollowings] = useState(user?.followings)

    useEffect(() => {
        let a = sortArray(posts)
        a = a?.filter(data => data.profileId === user?.profileId)
        setPostsData(a)
    }, [posts])

    useEffect(() => {
        async function fetchData() {
            try {
                if (user) {

                    // get total followers
                    let followersData = await follow.get(`/gettotalfollowers/${user?.profileId}`)
                    followersData = followersData.data.data.totalFollowers
                    if (user.followers !== followersData) {
                        setFollowers(followersData)
                        user && dispatch(updateUser({ followers: followersData }))
                    }

                    // get total followings
                    let followingsData = await follow.get(`/gettotalfollowings/${user?.profileId}`)
                    followingsData = followingsData.data.data.totalFollowings
                    if (user.followings !== followingsData) {
                        setFollowings(followingsData)
                        user && dispatch(updateUser({ followings: followingsData }))
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='max-w-xl mx-auto'>
                {/* Profile page header */}
                <ProfileHeader />
                <Zoom duration={150} triggerOnce>
                    {/* Profile infos */}
                    <div className='sm:pt-8 max-w-xl mx-auto px-2 sm:border-b sm:pb-6'>
                        <div className=' flex flex-row justify-start'>
                            {/* profile info */}
                            <div className='flex shrink-0 justify-center items-center mr-3 md:mr-12'>
                                <img className="select-none md:h-40 md:w-40 h-28 p-1 w-28 rounded-full border border-y-purple-600 border-x-violet-500 object-cover "
                                    src={user?.profilePhoto}
                                    alt='profile' />
                            </div>
                            {/* Profile name and follow button */}
                            <div className='flex flex-col w-full space-y-3'>
                                <div className='flex flex-row justify-between'>
                                    <h1 className='text-xl font-normal'>
                                        {user?.username}
                                    </h1>
                                    <button
                                        onClick={() => { navigate('/profile/update') }}
                                        type="button"
                                        className="h-7 rounded-md bg-sky-500  px-5 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                                    >
                                        Edit
                                    </button>
                                </div>
                                {/* follower following posts */}
                                {/* large screen */}
                                <div className=' hidden md:flex flex-row justify-start space-x-11'>
                                    {/* user post followers followings numbers */}
                                    <p className='select-none font-semibold text-base text-gray-800 flex'>
                                        <Slide triggerOnce direction='up' duration={150}>
                                            {
                                                postsData?.map(data => { return data?.profileId === user?.profileId })?.length
                                            }
                                        </Slide>
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            Posts
                                        </span>
                                    </p>
                                    <p onClick={() => { followers > 0 && navigate(`/profile/${user?.username}/followers`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex'>
                                        {
                                            followers?.toString() ? <Slide triggerOnce direction='down' duration={150}>{followers}</Slide> :
                                                <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                        }
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            followers
                                        </span>
                                    </p>
                                    <p onClick={() => { followings > 0 && navigate(`/profile/${user?.username}/followings`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex'>
                                        {
                                            followings?.toString() ? <Slide triggerOnce direction='down' duration={150}>{followings}</Slide> :
                                                <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                        }
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            following
                                        </span>
                                    </p>
                                </div>
                                {/* profile details name about bio */}
                                <div className='flex flex-row justify-start'>
                                    <div className=''>
                                        <p className='font-medium text-left text-base text-zinc-950'>
                                            {user?.name}
                                        </p>
                                        <p className='text-sm text-left text-zinc-950'>
                                            {user?.about}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start mt-4'>
                                    <p className='font-[500] text-sm text-gray-900 text-left'>
                                        {user?.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* mobile view */}
                        <div className='md:hidden flex flex-row justify-around py-2 mt-6 space-x-11 border-t border-b'>
                            {/* user post followers followings numbers */}
                            <p className='font-semibold select-none text-base text-gray-800 flex flex-col items-center justify-center'>
                                <Slide triggerOnce direction='up' duration={150}>
                                    {
                                        postsData?.map(data => { return data?.profileId === user?.profileId })?.length
                                    }
                                </Slide>
                                <span className='text-sm font-normal text-zinc-800'>
                                    Posts
                                </span>
                            </p>
                            <p onClick={() => { followers > 0 && navigate(`/profile/${user?.username}/followers`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {
                                    followers?.toString() ? <Slide triggerOnce direction='up' duration={150}>{followers}</Slide> :
                                        <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                }
                                <span className='text-sm ml-2 font-normal text-zinc-800'>
                                    followers
                                </span>
                            </p>
                            <p onClick={() => { followings > 0 && navigate(`/profile/${user?.username}/followings`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {
                                    followings?.toString() ? <Slide triggerOnce direction='up' duration={150}>{followings}</Slide> :
                                        <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                }
                                <span className='text-sm ml-2 font-normal text-zinc-800'>
                                    following
                                </span>
                            </p>
                        </div>
                    </div>
                </Zoom>
                {/* Profile posts */}
                <div className='flex flex-col mt-7 sm:px-6'>
                    {/* posts data -> postCard component */}
                    {
                        postsData ?
                            postsData.map(data => {
                                return (data?.profileId === user?.profileId) && <PostCard
                                    profilePhoto={data.profilePhoto}
                                    username={data.username}
                                    about={data?.about}
                                    profileId={data.profileId}
                                    id={data.id}
                                    image={data?.image}
                                    text={data?.text}
                                    like={data?.like}
                                    key={data.key}
                                    postKey={data.key}
                                    timestamp={data.timestamp}
                                    comment={data.comment}
                                />
                            }) :
                            <PostCardSkeleton />
                    }
                </div>
            </div>
        </>
    )
}

export default Profile