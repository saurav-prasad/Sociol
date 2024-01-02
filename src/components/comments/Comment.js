import React, { useEffect, useState } from 'react'
import { comment } from '../../axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comments'
import { createComment } from '../../features/comment/commentSlice'
import sortArray from '../../functions/sortArray'
import { Bounce, Fade, JackInTheBox, Slide } from 'react-awesome-reveal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

function Comment({ postId }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const comments = useSelector(state => state.commentReducer)
    const [allComments, setAllComments] = useState()
    const effe = comments[postId]

    useEffect(() => {
        async function fetchData() {
            try {
                if (comments[postId]) {
                    const sortedArray = sortArray(comments[postId])
                    setAllComments(sortedArray)
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
                    allComments ?
                        allComments.map(data =>
                            <Slide key={data.id} direction='up' duration={230} triggerOnce cascade damping={0.1}>
                                <Comments postId={data.postId} profileId={data.profileId} profilePhoto={data.profilePhoto} username={data.username}
                                    commentText={data.comment} commentId={data.id} timestamp={data.timestamp} />
                            </Slide>
                        ) :
                        <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">
                            {Array.from({ length: 1 }).map(_ =>
                                <div className='flex flex-row items-start px-2'>
                                    <div className='mr-2 flex-shrink-0'>
                                        <Skeleton width={40} height={40} circle borderRadius={50} />
                                    </div>
                                    <div className='w-full bg-[#fbfaf8] rounded px-3 py-2'>
                                        <div className='w-full flex flex-row items-center justify-between'>
                                            <Skeleton width={100} height={10} />
                                        </div>
                                        <p className='w-4/5 text-left text-slate-800'>
                                            <Skeleton className='w-full' height={10} />
                                        </p>
                                    </div>
                                </div>
                            )
                            }
                        </SkeletonTheme>
                }
            </div>
        </>
    )
}

export default Comment