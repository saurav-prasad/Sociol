import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/comment/commentSlice';
import { comment } from '../../axios';

function CommentBox({ profilePhoto, profileId, username, postId }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const [data, setData] = useState({ comment: '' })

    const onChange = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setData({
            comment: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const commentData = await comment.post(`/createcomment/${postId}`, {
                comment: data.comment
            }, { headers: { 'auth-token': user.token } })
            console.log(commentData.data.data);

            //  dispatch(addComment({ profileId, postId: postId, comment: commentData.data.data }))
            setData({ comment: '' })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex mt-1 flex-row items-start px-2 pt-3 border-t'>
            <div className='mr-2 flex-shrink-0'>
                <img
                    className='rounded-full w-8 h-8 object-cover'
                    src={user.profilePhoto} alt={user.username} />
            </div>
            <div className='w-full flex flex-row items-end border-b'>
                <textarea
                    name='comment'
                    value={data.comment}
                    onChange={onChange}
                    className='w-full outline-0 text-lg overflow-hidden resize-none	'
                    placeholder='Add a comment' id="" cols="" rows="1" />
                <button
                    type="button"
                    onClick={onSubmit}
                    className="h-7 ml-1 rounded-md bg-sky-500 px-5 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CommentBox