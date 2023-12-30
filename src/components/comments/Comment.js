import React, { useEffect, useState } from 'react'
import { comment } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'
import { createComment } from '../../features/comment/commentSlice'
import sortArray from '../../sortArray'
import { Bounce, Fade, JackInTheBox, Slide } from 'react-awesome-reveal'

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
                    // console.log(comments[postId]);
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
            <div className='space-y-5 mt-5'>
                {
                    allComments.map(data =>
                        <Slide direction='up' duration={230} triggerOnce cascade damping={0.1}>
                            <Comments key={data.id} profilePhoto={data.profilePhoto} username={data.username}
                                commentText={data.comment} commentId={data.id} timestamp={data.timestamp} />
                        </Slide>
                    )
                }
            </div>
        </>
    )
}

export default Comment