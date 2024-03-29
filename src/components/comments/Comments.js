import { MoreHorizontal, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import timePassed from '../../functions/timePassed';
import { useDispatch, useSelector } from 'react-redux';
import { comment } from '../../axios/axios';
import { deleteComment, updateComment } from '../../features/comment/commentSlice';
import { updatePost } from '../../features/post/postSlice';
import { useNavigate } from 'react-router-dom';



function Comments({ profilePhoto, username, postId, commentText, commentId, profileId, timestamp }) {
    const { user } = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postReducer)
    const [toggleOpen, setToggleOpen] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [commentUpdateStatus, setCommentUpdateStatus] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState(commentText)
    const textareaRef = useRef(null)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const navigate = useNavigate()

    const onDelete = async () => {
        setDeleteStatus(true)
        try {
            const deletedComment = await comment.delete(`/deletecomment/${commentId}`, {
                headers: {
                    'auth-token': user.token
                }
            })
            if (deletedComment.data.success) {
                // updating comment count
                let commentCount = 0
                posts.forEach(element => {
                    if (element.id === postId) {
                        commentCount = element.comment
                    }
                });
                dispatch(updatePost({ _id: postId, comment: commentCount - 1 }))
                dispatch(deleteComment({ id: commentId, postId: postId }))
                setDeleteStatus(false)
                setToggleOpen(!toggleOpen)

            }
        } catch (error) {
            setDeleteStatus(false)
            console.log(error);
        }
    }

    const onChange = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setData(e.target.value)
    }
    const onUpdate = async (e) => {
        e.preventDefault()
        setCommentUpdateStatus(true)
        try {
            const updateCmnt = await comment.post(`/updatecomment/${commentId}`, { comment: data }, {
                headers: {
                    'auth-token': user.token
                }
            })
            setCommentUpdateStatus(false)
            setUpdateStatus(false)
            updateCmnt.data.success && dispatch(updateComment({ id: commentId, postId, comment: data }))
        } catch (error) {
            console.log(error);
            setCommentUpdateStatus(false)
        }
    }

    const onUpdateClick = () => {
        setToggleOpen(!toggleOpen)
        setUpdateStatus(true)
    }

    return (
        <div className='flex flex-row items-start px-2'>
            {/* user image */}
            <div onClick={() => { navigate(`/profile/${username}`) }} className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full cursor-pointer w-8 h-8 object-cover'
                    src={profilePhoto} alt={username} />
            </div>
            <div className='w-full bg-[#fbfaf8] rounded px-3 py-2'>
                <div className='w-full flex flex-row items-center justify-between'>
                    {/* username */}
                    <span className='text-left mr-2 font-semibold cursor-pointer text-slate-900'>{username}</span>
                    <div className='flex flex-row items-center justify-between'>
                        {/* commented time */}
                        <span className='text-xs font-medium mr-2 text-slate-500'>{timePassed(timestamp)}</span>
                        {/* menu */}
                        {profileId === user?.profileId &&
                            <div className='relative'>
                                <MoreHorizontal onClick={() => setToggleOpen(!toggleOpen)} className='cursor-pointer' />
                                {toggleOpen &&
                                    <div className={`absolute right-0 top-0 transition ease-in-out z-10 `}>
                                        <div className='relative w-32 flex flex-col justify-start items-center divide-y divide-gray-300 bg-slate-100 rounded'>
                                            <div className='w-full text-left px-2 py-1  '>
                                                <div className='flex flex-row items-center'>
                                                    <span onClick={onUpdateClick} className='w-full select-none font-medium text-gray-700'>Update</span>
                                                    <X onClick={() => setToggleOpen(!toggleOpen)} size={28} className='z-10 right-0 top-0 cursor-pointer' />
                                                </div>
                                            </div>
                                            <div className='w-full text-left '>
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
                </div>
                {/* update section */}
                <div className='w-full'>
                    {/* update buttons */}
                    {
                        updateStatus ?
                            <div className='w-full flex flex-row items-end border-b'>
                                <textarea
                                    ref={textareaRef}
                                    name='comment'
                                    value={data}
                                    onClick={onChange}
                                    onChange={onChange}
                                    className='mt-3 p-1 w-full outline-0 text-lg overflow-hidden resize-none	'
                                    placeholder='Add a comment' id="" />
                                <div>
                                    <button
                                        type="button"
                                        className="rounded-md border mt-3 border-black px-2 py-1 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        onClick={() => { setUpdateStatus(!updateStatus) }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={data.length <= 0}
                                        type="button"
                                        onClick={onUpdate}
                                        className="cursor-pointer flex mt-3 w-16 h-7 justify-center items-center rounded-md bg-blue-600 py-1 px-3 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        {commentUpdateStatus ? <span className="loader text-[2px] h-[4px] w-[4px]" /> :
                                            'Update'}
                                    </button>
                                </div>
                            </div> :
                            // comment texts
                            <p className='text-left mt-2  text-slate-800'>
                                {commentText}
                            </p>

                    }
                </div>
            </div>
        </div>
    )
}

export default Comments