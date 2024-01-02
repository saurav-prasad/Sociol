import { MoreHorizontal, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import timePassed from '../../functions/timePassed';
import { useDispatch, useSelector } from 'react-redux';
import { comment } from '../../axios/axios';
import { deleteComment, updateComment } from '../../features/comment/commentSlice';
import { updatePost } from '../../features/post/postSlice';



function Comments({ profilePhoto, username, postId, commentText, commentId, profileId, timestamp }) {
    const { user } = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postReducer)
    const [toggleOpen, setToggleOpen] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [commentUpdateStatus, setCommentUpdateStatus] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState(commentText)
    const textareaRef = useRef(null)

    const onDelete = async () => {
        try {
            setToggleOpen(!toggleOpen)
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setData(e.target.value)
    }
    const onUpdate = async (e) => {
        console.log("object");
        e.preventDefault()
        setCommentUpdateStatus(true)
        try {
            const updateCmnt = await comment.post(`/updatecomment/${commentId}`, { comment: data }, {
                headers: {
                    'auth-token': user.token
                }
            })
            console.log(updateCmnt);
            setCommentUpdateStatus(false)
            setUpdateStatus(false)
            //  TODO working here
            dispatch(updateComment({ id: commentId, comment: data }))
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
            <div className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full cursor-pointer w-8 h-8 object-cover'
                    src={profilePhoto} alt={username} />
            </div>
            <div className='w-full bg-[#fbfaf8] rounded px-3 py-2'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <span className='text-left mr-2 font-semibold cursor-pointer text-slate-900'>{username}</span>
                    <div className='flex flex-row items-center justify-between'>
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
                                            <div className='w-full text-left px-2 py-1 '>
                                                <span onClick={onDelete} className='w-full select-none font-medium text-gray-700'>Delete</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className='w-full'>
                    {
                        updateStatus ?
                            <div className='w-full flex flex-row items-end border-b'>
                                <textarea
                                    ref={textareaRef}
                                    name='comment'
                                    value={data}
                                    onClick={onChange}
                                    onChange={onChange}
                                    className='w-full outline-0 text-lg overflow-hidden resize-none	'
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
                                        type="button"
                                        onClick={onUpdate}
                                        className="cursor-pointer flex mt-3 w-16 h-7 justify-center items-center rounded-md bg-blue-600 py-1 px-3 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        {commentUpdateStatus ? <span className="loader text-[2px] h-[4px] w-[4px]" /> :
                                            'Update'}
                                    </button>
                                </div>
                            </div> :
                            <p className='text-left  text-slate-800'>
                                {commentText}
                            </p>

                    }
                </div>
            </div>
        </div>
    )
}

export default Comments