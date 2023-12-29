import React, { useEffect, useState } from 'react'
import { comment } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'
import { createComment } from '../../features/comment/commentSlice'
import sortArray from '../../sortArray'

function Comment({ postId }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const comments = useSelector(state => state.commentReducer)
    const [allComments, setAllComments] = useState([])
    const effe = comments[postId]
    useEffect(() => {
        async function fetchData() {
            try {
                if (comments[postId]) {
                    const sortedArray = sortArray(comments[postId])
                    setAllComments(sortedArray)
                    console.log(comments[postId]);
                }
                else if (!comments[postId]) {
                    const commentsData = await comment.get(`/getcomment/${postId}`, {
                        headers: {
                            'auth-token': user.token
                        }
                    })
                    const sortedArray = sortArray(commentsData?.data?.data)
                    setAllComments(sortedArray)
                    dispatch(createComment({ postId, comments: sortedArray }))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [effe])

    return (
        <>
            {
                allComments.map(data =>
                    <Comments key={data.id} profilePhoto={data.profilePhoto} username={data.username}
                        commentText={data.comment} commentId={data.id} />
                )
            }
        </>
    )
}

export default Comment