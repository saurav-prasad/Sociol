import React, { useEffect, useState } from 'react'
import PostCard, { PostCardSkeleton } from '../postCard/PostCard'
import {  useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Slide, Zoom } from 'react-awesome-reveal'
import { follow, post, profile } from '../../axios/axios'
import ProfileHeader from '../profileHeader/ProfileHeader'
import Skeleton from 'react-loading-skeleton'
import sortArray from '../../functions/sortArray'

function ProfileByUsername() {
    const navigate = useNavigate()
    const username = useParams().username
    const { user } = useSelector(state => state.authReducer)
    const [postsData, setPostsData] = useState()
    const [data, setData] = useState()
    const [ifFollow, setIfFollow] = useState(false)
    const [followings, setFollowings] = useState()
    const [followers, setFollowers] = useState()
    const [followStatus, setFollowStatus] = useState(false)

    // handel follow unfollow
    const handelFollow = async (e) => {
        e.preventDefault()
        setFollowStatus(true)
        try {
            // if following
            if (ifFollow) {
                await follow.get(`/unfollow/${data._id}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                setFollowers(followers - 1)
                setIfFollow(!ifFollow)
                setFollowStatus(false)
            }
            // if not following
            else if (!ifFollow) {
                await follow.get(`/createfollow/${data._id}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                setFollowers(followers + 1)
                setIfFollow(!ifFollow)
                setFollowStatus(false)
            }

        } catch (error) {
            setFollowStatus(false)
            console.log(error);
        }
    }


    useEffect(() => {
        async function fetchData() {
            try {

                if (username === user?.username) navigate('/profile')
                else if (user) {
                    // profile data
                    let profileData = await profile.get(`/getprofilebyusername/${username}`)
                    profileData = profileData.data.data
                    setData(profileData)

                    // check if follow
                    let checkFollow = await follow.get(`/iffollow/${profileData?._id}`, {
                        headers: {
                            'auth-token': user?.token
                        }
                    })
                    checkFollow = checkFollow.data.data.following
                    setIfFollow(checkFollow)

                    // get total followers
                    let followersData = await follow.get(`/gettotalfollowers/${profileData?._id}`)
                    followersData = followersData.data.data.totalFollowers
                    setFollowers(followersData)

                    // get total followings
                    let followingData = await follow.get(`/gettotalfollowings/${profileData?._id}`)
                    followingData = followingData.data.data.totalFollowings
                    setFollowings(followingData)

                    // get all posts
                    let posts = await post.get(`/getpostbyprofileid/${profileData?._id}`)
                    posts = sortArray(posts.data.data)
                    setPostsData(posts)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [username])

    return (
        <>
            <div className='max-w-xl mx-auto'>
                <Zoom duration={150} triggerOnce>
                    {/* Profile page header */}
                    <ProfileHeader />
                    {/* Profile infos */}
                    <div className='sm:pt-8 max-w-xl mx-auto px-2 sm:border-b sm:pb-6'>
                        <div className=' flex flex-row justify-start'>
                            {/* profile info */}
                            <div className='flex shrink-0 justify-center items-center mr-3 md:mr-12'>
                                {
                                    data ?
                                        <img className="select-none md:h-40 md:w-40 h-28 p-1 w-28 rounded-full border border-y-purple-600 border-x-violet-500 object-cover "
                                            src={data?.profilePhoto}
                                            alt='' /> :
                                        <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={100} height={100} circle borderRadius={50} />
                                }
                            </div>
                            {/* Profile name and follow button */}
                            <div className='flex flex-col w-full space-y-3'>
                                <div className='flex flex-row justify-between'>
                                    <h1 className='text-xl font-normal'>
                                        {data?.username}
                                    </h1>
                                    <button
                                        type="submit"
                                        onClick={handelFollow}
                                        disabled={!setFollowStatus}
                                        className="flex justify-center items-center rounded-md bg-sky-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900 h-7 w-18"
                                    >
                                        {
                                            followStatus ?
                                                < span className="loader mx-6 text-[2px] h-[4px] w-[4px]" /> :
                                                ifFollow ? 'UnFollow' : 'Follow'
                                        }
                                    </button>
                                </div>
                                {/* follower following posts */}
                                {/* Large screen */}
                                <div className=' hidden md:flex flex-row justify-start space-x-11'>
                                    {/* user post followers followings numbers */}
                                    <p className='select-none font-semibold text-base text-gray-800 flex'>
                                        {
                                            postsData ? <Slide triggerOnce direction='down' duration={150}>{postsData.length}</Slide> :
                                                <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                        }
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            Posts
                                        </span>
                                    </p>
                                    <p onClick={() => { followers > 0 && navigate(`/profile/${username}/followers`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex'>
                                        {
                                            followers?.toString() ? <Slide triggerOnce direction='down' duration={150}>{followers}</Slide> :
                                                <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                        }
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            followers
                                        </span>
                                    </p>
                                    <p onClick={() => { followings > 0 && navigate(`/profile/${username}/followings`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex'>
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
                                            {data?.name}
                                        </p>
                                        <p className='text-sm text-left text-zinc-950'>
                                            {data?.about}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start mt-4'>
                                    <p className='font-[500] text-sm text-gray-900 text-left'>
                                        {data?.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Mobile screen */}
                        <div className='md:hidden flex flex-row justify-around py-2 mt-6 space-x-11 border-t border-b'>
                                                                {/* user post followers followings numbers */}
                            <p className='font-semibold select-none text-base text-gray-800 flex flex-col items-center justify-center'>
                                {
                                    postsData ? <Slide triggerOnce direction='up' duration={150}>{postsData.length}</Slide> :
                                        <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                }
                                <span className='text-sm font-normal text-zinc-800'>
                                    Posts
                                </span>
                            </p>
                            <p onClick={() => { followers > 0 && navigate(`/profile/${username}/followers`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {
                                    followers?.toString() ? <Slide triggerOnce direction='up' duration={150}>{followers}</Slide> :
                                        <Skeleton baseColor="#d4d4d4" highlightColor="#858383" width={10} height={15} />
                                }
                                <span className='text-sm ml-2 font-normal text-zinc-800'>
                                    followers
                                </span>
                            </p>
                            <p onClick={() => { followings > 0 && navigate(`/profile/${username}/followings`) }} className='cursor-pointer select-none font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
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
                </Zoom >
                {/* Profile posts */}
                < div className='flex flex-col mt-7 px-2 sm:px-6' >
                    {/* posts data-> postCard component */}
                    {
                        postsData ?
                            postsData.map(data => {
                                return <PostCard
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
                            < PostCardSkeleton />
                    }
                </ div>
            </div >
        </>
    )
}

export default ProfileByUsername