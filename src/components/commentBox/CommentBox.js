import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/comment/commentSlice';
import { comment } from '../../axios/axios';
import { updatePost } from '../../features/post/postSlice';

function CommentBox({ profilePhoto, profileId, username, postId, }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const [data, setData] = useState({ comment: '' })
    const textareaRef = useRef(null)
    const posts = useSelector(state => state.postReducer)
    const [commentStatus, setCommentStatus] = useState(false)

    const onChange = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setData({
            comment: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setCommentStatus(true)
        try {
            if (data.comment.length >= 1) {
                // creating the comment in database
                const commentData = await comment.post(`/createcomment/${postId}`, {
                    comment: data.comment
                }, { headers: { 'auth-token': user.token } })

                dispatch(addComment({ postId, comment: commentData.data.data }))
                // updating comment count
                let commentCount = 0
                posts.forEach(element => {
                    if (element.id === postId) {
                        commentCount = element.comment
                    }
                });

                dispatch(updatePost({ _id: postId, comment: commentCount + 1 }))

                setData({ comment: '' })
                textareaRef.current.style.height = '30px'
            }
            setCommentStatus(false)
        } catch (error) {
            console.log(error);
            setCommentStatus(false)
        }
    }
    return (
        <div className='flex mt-1 flex-row items-start px-2 pt-3 border-t'>
            <div className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full w-8 h-8 object-cover'
                    src={user?.profilePhoto} alt={user?.username} />
            </div>
            <div className='w-full flex flex-row items-end border-b'>
                <textarea
                    ref={textareaRef}
                    name='comment'
                    value={data?.comment}
                    onChange={onChange}
                    className='w-full p-1 outline-0 text-lg overflow-hidden resize-none	'
                    placeholder='Add a comment' id="" cols="" rows="1" />
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={data.comment.length <= 0}
                    className="cursor-pointer flex w-28 h-8 justify-center items-center rounded-md bg-blue-600 py-1 px-2 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    {commentStatus ? <span className="loader text-[3px] h-[5px] w-[5px]" /> :
                        'Comment'}
                </button>
            </div>
        </div>
    )
}

export default CommentBox