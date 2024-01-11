import React, { useEffect, useState } from 'react'
import Profiles from './Profiles'
import { useLocation, useParams } from 'react-router-dom'
import { follow, profile } from '../../axios/axios'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function Network() {
    const username = useParams().username
    const pathname = useLocation().pathname
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            try {

                let profileData = await profile.get(`/getprofilebyusername/${username}`)
                profileData = profileData.data.data

                if (pathname.endsWith('/followers')) {
                    let followersData = await follow.get(`/getfollowers/${profileData._id}`)
                    followersData = followersData.data.data
                    setData(followersData)
                }
                else if (pathname.endsWith('/followings')) {
                    let followingsData = await follow.get(`/getfollowings/${profileData._id}`)
                    followingsData = followingsData.data.data
                    setData(followingsData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    }, [username])


    return (
        <div className="max-w-lg mx-auto">
            {/* Header */}
            <h1 className="mb-4 text-3xl font-semibold text-gray-800 py-6  ">
                {pathname.endsWith('/followings') ? "Followings" : "Followers"}
            </h1>
            <div className="flex flex-col space-y-6 ">
                {/* All profiles */}
                {
                    data ? data.map((e, index) =>
                        <Profiles
                            key={index}
                            profilePhoto={e.profilePhoto}
                            username={e.username}
                            about={e?.about}
                            profileId={e.profileId}
                        />
                    ) :
                        // sekeleton
                        <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383" >
                            {
                                Array.from({ length: 3 }).map((e, index) =>
                                    <div key={index} className="flex flex-row items-start select-none bg-white/50 rounded px-3 py-3">
                                        <Skeleton width={50} height={50} circle borderRadius={50} />
                                        <div className="ml-3 min-w-0 flex flex-col items-start justify-center">
                                            <Skeleton width={100} height={15} />
                                            <Skeleton width={100} height={10} />
                                        </div>
                                    </div>
                                )
                            }
                        </SkeletonTheme>
                }
            </div>
        </div>
    )
}

export default Network