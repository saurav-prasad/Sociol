import React, { useEffect, useState } from 'react'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import sliceString from '../../functions/sliceString';
import { Slide } from "react-awesome-reveal";
import { MoreHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../../features/post/postSlice';
import { liked, post } from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import CommentBox from '../commentBox/CommentBox';
import Comment from '../comments/Comment';
import timePassed from '../../functions/timePassed';
import throttle from '../../functions/throttle';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function PostCard({ profilePhoto, username, about, profileId, postKey, id, image, text, like, comment, timestamp }) {
    const [more, setMore] = useState(false)
    const [toggleOpen, settoggleOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const [postImage, setPostImage] = useState()
    const [ifLiked, setIfLiked] = useState(false)
    const [toggleComment, setToggleComment] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)

    const onUpdate = () => {
        navigate(`/updatepost/${id}`)
    }

    const onDelete = async () => {
        setDeleteStatus(true)
        try {
            await post.delete(`/deletepost/${id}`, {
                headers: {
                    'auth-token': user.token
                }
            })
            dispatch(deletePost({ key: postKey }))
            setDeleteStatus(false)
        } catch (error) {
            setDeleteStatus(false)
            console.log(error);
        }
    }

    const onLikeClick = throttle(async () => {
        try {
            if (ifLiked) {
                if (like >= 1) {
                    setIfLiked(false)
                    const unlike = await liked.get(`/unlike/${id}`, {
                        headers: {
                            "auth-token": user.token
                        }
                    })
                    unlike.data.data.unLiked && dispatch(updatePost({ _id: id, like: like - 1 }))
                }
            }
            else if (!ifLiked) {
                setIfLiked(true)
                const likePost = await liked.get(`/like/${id}`, {
                    headers: {
                        "auth-token": user.token
                    }
                })
                likePost.data.data.liked && dispatch(updatePost({ _id: id, like: like + 1 }))
            }

        } catch (error) {
            console.log(error);
        }
    }, 1000)

    useEffect(() => {
        async function fetchData() {
            // setting the post image if available
            image && setPostImage(image)
            try {

                const checkLiked = await liked.get(`/iflike/${id}`, {
                    headers: {
                        'auth-token': user.token
                    }
                })
                setIfLiked(checkLiked.data.data.liked)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [image])

    return (
        <Slide direction='up' duration={250} triggerOnce cascade damping={1}>
            <div className="flex flex-col rounded-lg py-2 border bg-white mb-10 ">
                {/* user details */}
                <div className='flex items-center justify-between px-3 mb-3'>
                    <div className='flex items-center justify-start'>
                        <img onClick={() => navigate(`/profile/${username}`)} className="cursor-pointer inline-block h-10 w-10 object-cover rounded-full border bg-gradient-to-r from-purple-500/90 to-pink-500/90"
                            src={profilePhoto} alt={username} />
                        <div className=' flex ml-2 flex-col justify-center items-sart'>
                            <p onClick={() => navigate(`/profile/${username}`)} className='select-none cursor-pointer text-left text-md font-semibold'>{username}</p>
                            {about && <span className='select-none text-left text-xs text-zinc-600'>{sliceString(about, 35)}</span>}
                        </div>
                    </div>
                    {/* menu */}
                    {profileId === user?.profileId &&
                        <div className='relative'>
                            <MoreHorizontal onClick={() => settoggleOpen(!toggleOpen)} className='cursor-pointer' />
                            {toggleOpen &&
                                <div className={`absolute right-0 top-0 transition ease-in-out z-10 `}>
                                    <div className='relative w-32 flex flex-col justify-start items-center divide-y divide-gray-300 bg-slate-300 rounded'>
                                        <div className='w-full text-left px-2 py-2  '>
                                            <div className='flex flex-row items-center'>
                                                <span onClick={onUpdate} className='w-full select-none font-medium text-gray-800'>Update</span>
                                                <X onClick={() => settoggleOpen(!toggleOpen)} size={28} className='z-10 right-0 top-0 cursor-pointer' />
                                            </div>
                                        </div>
                                        <div className='w-full text-left '>
                                            {/* <span onClick={onDelete} className='w-full select-none font-medium text-gray-700'>Delete</span> */}
                                            <button
                                                type="submit"
                                                onClick={onDelete}
                                                disabled={deleteStatus}
                                                className="cursor-pointer flex w-full justify-center items-center h-10 rounded-b bg-slate-400 px-2 py-1.5 leading-6 text-gray-900 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                                            >
                                                {
                                                    deleteStatus ?
                                                        <span className="loader text-[3px] h-[5px] w-[5px]" /> :
                                                        <span className='w-full text-left font-medium text-base'>Delete</span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                {/* Post text */}
                <div className='text-left mb-3 px-3 transition-all text-md antialiased leading-[1.59rem] '>
                    {text &&
                        sliceString(text, more ? 0 : 150)
                    }
                    {(text && text.length > 150) &&
                        <span onClick={() => { setMore(!more) }} className='whitespace-nowrap select-none cursor-pointer text-xs px-2 py-1 text-center'>&nbsp;&nbsp; Read {more ? 'less' : 'more'}</span>}

                </div>
                {/* Post image */}
                {postImage && <img
                    src={postImage}
                    onError={() => setPostImage()}
                    alt="Post"
                    className="h-auto w-full object-contain"
                />}
                {/* total likes */}
                <div className='flex flex-row items-center justify-between px-2 mt-3'>
                    <div>
                        <span className='w-full mr-2 text-left text-base font-semibold text-slate-700'>{like}
                            <span className='text-xs font-medium ml-1 text-slate-500'>Likes</span>
                        </span>
                        <span className='w-full text-left text-base font-semibold text-slate-700'>{comment}
                            <span className='text-xs font-medium ml-1 text-slate-500'>Comments</span>
                        </span>
                    </div>
                    <span className='text-xs font-medium ml-2 text-slate-500'>{timePassed(timestamp)}</span>
                </div>
                {/* Like and comment */}
                <div className='flex justify-around pt-1 border-t'>
                    <div onClick={onLikeClick} className={`${ifLiked ? 'active:scale-90' : 'active:scale-110'} active:transition-all duration-200  ease-in-out select-none p-2 flex items-center cursor-pointer  ${ifLiked ? 'text-blue-600' : 'text-zinc-500'}`}>
                        <ThumbUpRoundedIcon fontSize='medium' className='scale-x-[-1] ' />
                        <span className='font-medium ml-1 text-sm'>Like</span>
                    </div>

                    <div onClick={() => setToggleComment(!toggleComment)} className={`${toggleComment ? 'active:scale-90' : 'active:scale-110'}  select-none duration-200 p-2 flex items-center cursor-pointer ease-in-out ${toggleComment ? 'text-blue-600' : 'text-zinc-500'} active:transition-all`}>
                        <CommentRoundedIcon fontSize='medium' className='' />
                        <span className='font-medium text-sm ml-1'>Comment</span>
                    </div>
                </div>
                {
                    toggleComment &&
                    <>
                        {/* write a comment */}
                        <CommentBox profileId={profileId} postId={id} profilePhoto={profilePhoto} username={username} />
                        {/* comments */}
                        <Comment postId={id} profileId={profileId} />
                    </>
                }
            </div>
        </Slide >
    )
}

export default PostCard


export const PostCardSkeleton = () => {
    return <>
        <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">

            < div className="flex flex-col rounded-lg py-2 border bg-white mb-10 " >
                {/* user details */}
                < div className='flex items-center justify-between px-3 mb-3' >
                    <div className='flex items-center justify-start'>
                        <Skeleton width={50} height={50} circle borderRadius={50} />
                        <div className='flex ml-2 flex-col justify-center items-sart'>
                            <p className=' text-left text-md font-semibold'>
                                <Skeleton width={100} height={10} />
                            </p>
                            <span className='text-left text-xs text-zinc-600'>
                                <Skeleton width={100} height={10} />
                            </span>
                        </div>
                    </div>
                </div >
                {/* Post text */}
                < div className='text-left w-2/4 mb-1 px-3 transition-all text-md antialiased leading-[1.59rem] ' >
                    <Skeleton className='' height={15} />
                </div >
                <div className='text-left mb-3 w-3/4 px-3 transition-all text-md antialiased leading-[1.59rem] '>
                    <Skeleton className='' height={15} />
                </div>
                {/* Post image */}
                <div className='h-60'>
                    <Skeleton className='w-full h-full' />
                </div>
                {/* total likes */}
                <div className='flex flex-row items-center justify-start px-2 mt-3'>
                    <span className='w-10 mr-2 text-left text-base font-semibold text-slate-700'>
                        <span className='text-xs font-medium ml-1 text-slate-500'>
                            <Skeleton className='w-full' height={10} />
                        </span>
                    </span>
                    <span className='w-10 mr-2 text-left text-base font-semibold text-slate-700'>
                        <span className='text-xs font-medium ml-1 text-slate-500'>
                            <Skeleton className='w-full' height={10} />
                        </span>
                    </span>
                </div>
                {/* Like and comment */}
                <div className='flex justify-around pt-1 border-t'>
                    <span className='w-16 mr-2 text-left text-base font-semibold text-slate-700'>
                        <span className='text-xs font-medium ml-1 text-slate-500'>
                            <Skeleton borderRadius={15} className='w-full' height={25} />
                        </span>
                    </span>
                    <span className='w-16 mr-2 text-left text-base font-semibold text-slate-700'>
                        <span className='text-xs font-medium ml-1 text-slate-500'>
                            <Skeleton borderRadius={15} className='w-full' height={25} />
                        </span>
                    </span>
                </div>
            </div >
        </SkeletonTheme>
    </>
}