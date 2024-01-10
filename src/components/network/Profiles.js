import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { follow } from '../../axios/axios'

function Profiles({ profilePhoto, about, username, profileId }) {
    const navigate = useNavigate()
    const [followStatus, setFollowStatus] = useState(false)
    const { user } = useSelector(state => state.authReducer)
    const [ifFollow, setIfFollow] = useState(false)

    const handelFollow = async (e) => {
        e.preventDefault()
        setFollowStatus(true)
        try {
            if (ifFollow) {
                await follow.get(`/unfollow/${user.profileId}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                setIfFollow(!ifFollow)
                setFollowStatus(false)
            }
            else if (!ifFollow) {
                await follow.get(`/createfollow/${user.profileId}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
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

                // check if follow
                let checkFollow = await follow.get(`/iffollow/${user.profileId}`, {
                    headers: {
                        'auth-token': user?.token
                    }
                })
                checkFollow = checkFollow.data.data.following
                setIfFollow(checkFollow)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-row justify-between items-center select-none bg-white/70 rounded px-2 py-3">
            <div className='flex flex-row items-start'>
                <img onClick={() => navigate(`/profile/${username}`)} className=" cursor-pointer h-12 w-12 object-cover rounded-full border"
                    src={profilePhoto} alt={username} />
                <div className="ml-3 min-w-0 flex flex-col items-start justify-center">
                    <p onClick={() => navigate(`/profile/${username}`)} className="cursor-pointer truncate text-left text-lg font-semibold text-gray-800">{username}</p>
                    <p onClick={() => navigate(`/profile/${username}`)} className="cursor-pointer truncate text-left text-sm text-gray-500">{about}</p>
                </div>
            </div>
            {
                user.profileId !== profileId &&

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
            }
        </div>
    )
}

export default Profiles