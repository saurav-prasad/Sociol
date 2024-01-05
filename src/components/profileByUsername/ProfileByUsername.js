import React, { useEffect, useState } from 'react'
import PostCard, { PostCardSkeleton } from '../postCard/PostCard'
import { Power } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../features/auth/authSlice'
import sortArray from '../../functions/sortArray'
import { Zoom } from 'react-awesome-reveal'
import { follow, post, profile } from '../../axios/axios'
import ProfileHeader from '../profileHeader/ProfileHeader'

function ProfileByUsername() {
    const navigate = useNavigate()
    const username = useParams().username
    const { user } = useSelector(state => state.authReducer)
    const [postsData, setPostsData] = useState()
    const [data, setData] = useState()
    const [ifFollow, setIfFollow] = useState(false)
    const [followings, setFollowings] = useState()
    const [followers, setFollowers] = useState()


    const handelFollow = async (e) => {
        e.preventDefault()
        // TODO fix the backend first
        try {
            if (ifFollow) {
                const unfollow = await follow.get(`/unfollow/${data._id}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                console.log(unfollow);
            }
            else if (!ifFollow) {
                const followNew = await follow.get(`/createfollow/${data._id}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                console.log(followNew);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    })

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
                    let checkFollow = await follow.get(`/iffollow/${profileData._id}`, {
                        headers: {
                            'auth-token': user?.token
                        }
                    })
                    checkFollow = checkFollow.data.data.following
                    setIfFollow(checkFollow)


                    // get followers
                    let followersData = await follow.get(`/followers/${profileData._id}`, {
                        headers: {
                            'auth-token': user?.token
                        }
                    })
                    followersData = followersData.data.data
                    setFollowers(followersData)

                    // get followings
                    let followingData = await follow.get(`/following`, {
                        headers: {
                            'auth-token': user?.token
                        }
                    })
                    followingData = followingData.data.data
                    setFollowings(followingData)

                    // get all posts
                    let posts = await post.get(`/getpostbyprofileid/${profileData._id}`)
                    setPostsData(posts.data.data)
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
                                <img className="select-none md:h-40 md:w-40 h-28 p-1 w-28 rounded-full border border-y-purple-600 border-x-violet-500 object-cover "
                                    src={data?.profilePhoto}
                                    alt='profile' />
                            </div>
                            {/* Profile name and follow button */}
                            <div className='flex flex-col w-full space-y-3'>
                                <div className='flex flex-row justify-between'>
                                    <h1 className='text-xl font-normal'>
                                        {data?.username}
                                    </h1>
                                    <button
                                        onClick={handelFollow}
                                        type="button"
                                        className="h-7 rounded-md bg-sky-500  px-2 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                                    >
                                        {ifFollow ? 'UnFollow' : 'Follow'}
                                    </button>
                                </div>
                                {/* follower following posts */}
                                {/* Large screen */}
                                <div className=' hidden md:flex flex-row justify-start space-x-11'>
                                    <p className='select-none font-semibold text-base text-gray-800'>
                                        {postsData?.length}
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            Posts
                                        </span>
                                    </p>
                                    <p className='select-none font-semibold text-base text-gray-800'>
                                        {followers?.length}
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            followers
                                        </span>
                                    </p>
                                    <p className='select-none font-semibold text-base text-gray-800'>
                                        {followings?.length}
                                        <span className='select-none text-base ml-2 font-normal text-zinc-800'>
                                            following
                                        </span>
                                    </p>
                                </div>
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
                            <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {postsData?.length}
                                <span className='text-sm font-normal text-zinc-800'>
                                    Posts
                                </span>
                            </p>
                            <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {followers?.length}
                                <span className='text-sm ml-2 font-normal text-zinc-800'>
                                    followers
                                </span>
                            </p>
                            <p className='font-semibold text-base text-gray-800 flex flex-col items-center justify-center'>
                                {followings?.length}
                                <span className='text-sm ml-2 font-normal text-zinc-800'>
                                    following
                                </span>
                            </p>
                        </div>
                    </div>
                </Zoom>
                {/* Profile posts */}
                <div className='flex flex-col mt-7 px-2 sm:px-6'>
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
                            <PostCardSkeleton />
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileByUsername