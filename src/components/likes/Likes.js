import { useEffect, useState } from "react"
import { liked } from "../../axios/axios"
import { useNavigate, useParams } from "react-router-dom"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Slide, Zoom } from "react-awesome-reveal"
import Profiles from "../network/Profiles"
import { Undo2 } from "lucide-react"

const Likes = () => {
    const postId = useParams().postid
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                let likesData = await liked.get(`/getlikes/${postId}`)
                likesData = likesData.data.data
                setData(likesData)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    }, [postId])

    return (
        <>
            <div className="max-w-lg mx-auto">
                <div className="relative mb-4">
                    <Undo2 onClick={() => navigate(-1)} className="absolute cursor-pointer top-[27px] left-2" strokeWidth={3} size={30} />
                    {/* Header */}
                    <h1 className="flex-1 text-3xl font-semibold text-gray-800 py-6  ">
                        Likes
                    </h1>
                </div>
                <div className="flex flex-col space-y-6 ">
                    {/* All profiles */}
                    {
                        data ?
                            data.map((e, index) =>
                                <Slide key={index} direction='up' duration={230} triggerOnce cascade damping={0.1}>
                                    <Profiles
                                        profilePhoto={e.profilePhoto}
                                        username={e.username}
                                        about={e?.about}
                                        profileId={e.profileId}
                                    />
                                </Slide>
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
        </>
    )
}
export default Likes