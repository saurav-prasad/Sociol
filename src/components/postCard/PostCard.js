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

function PostCard({ profilePhoto, username, about, profileId, postKey, id, image, text, like, comment, timestamp }) {
    const [more, setMore] = useState(false)
    const [toggleOpen, settoggleOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const [postImage, setPostImage] = useState()
    const [ifLiked, setIfLiked] = useState(false)
    const [toggleComment, setToggleComment] = useState(false)

    const onUpdate = () => {
        navigate(`/updatepost/${id}`)
    }

    const onDelete = async () => {
        try {
            await post.delete(`/deletepost/${id}`, {
                headers: {
                    'auth-token': user.token
                }
            })
            dispatch(deletePost({ key: postKey }))
        } catch (error) {
            console.log(error);
        }
    }

    const onLikeClick = async () => {
        try {
            if (ifLiked) {
                setIfLiked(false)
                const unlike = await liked.get(`/unlike/${id}`, {
                    headers: {
                        "auth-token": user.token
                    }
                })
                unlike.data.data.unLiked && dispatch(updatePost({ _id: id, like: like - 1 }))
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
    }

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
                        <img class="inline-block h-10 w-10 object-cover rounded-full border bg-gradient-to-r from-purple-500/90 to-pink-500/90"
                            src={profilePhoto} alt="" />
                        <div className='flex ml-2 flex-col justify-center items-sart'>
                            <p className=' text-left text-md font-semibold'>{username}</p>
                            {about && <span className='text-left text-xs text-zinc-600'>{sliceString(about, 35)}</span>}
                        </div>
                    </div>
                    {/* menu */}
                    {profileId === user?.profileId &&
                        <div className='relative'>
                            <MoreHorizontal onClick={() => settoggleOpen(!toggleOpen)} className='cursor-pointer' />
                            {toggleOpen &&
                                <div className={`absolute right-0 top-0 transition ease-in-out z-10 `}>
                                    <div className='relative w-32 flex flex-col justify-start items-center divide-y divide-gray-300 bg-slate-100 rounded'>
                                        <div className='w-full text-left px-2 py-2  '>
                                            <div className='flex flex-row items-center'>
                                                <span onClick={onUpdate} className='w-full select-none font-medium text-gray-700'>Update</span>
                                                <X onClick={() => settoggleOpen(!toggleOpen)} size={28} className='z-10 right-0 top-0 cursor-pointer' />
                                            </div>
                                        </div>
                                        <div className='w-full text-left px-2 py-2 '>
                                            <span onClick={onDelete} className='w-full select-none font-medium text-gray-700'>Delete</span>
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
                    <div onClick={onLikeClick} className={`select-none p-2 flex items-center cursor-pointer  ${ifLiked ? 'text-blue-600' : 'text-zinc-500'}`}>
                        <ThumbUpRoundedIcon fontSize='medium' className='scale-x-[-1]' />
                        <span className='font-medium ml-1 text-sm'>Like</span>
                    </div>

                    <div onClick={() => setToggleComment(!toggleComment)} className='select-none p-2 flex items-center cursor-pointer  text-zinc-500'>
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
        </Slide>
    )
}


export default PostCard