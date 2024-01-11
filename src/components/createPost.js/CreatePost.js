import { Image } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../../axios/axios'
import uploadImage from '../../firestoreQuery/uploadImage'
import { addPost, } from '../../features/post/postSlice'
import { Zoom } from 'react-awesome-reveal'

function CreatePost() {
    const [image, setImage] = useState()
    const [data, setData] = useState({ text: '', image: '', profileId: '', userId: '' })
    const { user } = useSelector(state => state.authReducer)
    const imageRef = useRef(null)
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [submitStatus, setSubmitStatus] = useState(false)
    const dispatch = useDispatch()

    // on uploading the image from computer
    const onImageUpload = (e) => {
        const file = e.target.files[0]
        setData({
            ...data,
            image: file
        })
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target.result)
            }
            reader.readAsDataURL(file)
        }
        else {
            setImage()
        }
    }

    const onChange = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setError()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError()
        setSubmitStatus(true)
        try {
            // console.log(data);
            let uploadedimage;
            if (image) {
                uploadedimage = await uploadImage(data.image, 'post')
            }
            const createPost = await post.post('/createpost', image ? {
                userId: user?.userId,
                profileId: user?.profileId,
                text: data.text,
                image: uploadedimage
            } : {
                userId: user?.userId,
                profileId: user?.profileId,
                text: data.text
            }, {
                headers: {
                    'auth-token': user.token
                }
            })
            dispatch(addPost(createPost.data.data))
            navigate('/profile')
            setSubmitStatus(false)
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message)
            setSubmitStatus(false)
        }

    }

    // if image fails to load
    const onImageLoadError = () => {
        setData({ ...data, image: '' })
        imageRef.current.src = "https://cdn.iconscout.com/icon/free/png-256/free-data-not-found-1965034-1662569.png"
        setImage()
    }

    useEffect(() => {
        setData({
            userId: user?.userId,
            profileId: user?.profileId
        })
    }, [user])

    return (
        <Zoom duration={180} triggerOnce>
            <div className='max-w-md mx-auto px-1  '>
                <h1 className='text-3xl font-semibold pt-5 mb-10'>Create a post</h1>
                <div className="col-span-full mb-7">
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        Write about your post
                    </label>
                    {/* Post texts */}
                    <div className="mt-2">
                        <textarea
                            id="text"
                            name="text"
                            onChange={onChange}
                            rows={5}
                            className="block w-full bg-slate-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg text-lg sm:leading-7 px-2 overflow-hidden resize-none"
                            defaultValue={''}
                            placeholder='Write a post here...'
                        />
                    </div>
                </div>
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Upload an image
                </label>
                {/* post image */}
                <div className={`mt-5 rounded ${!image && 'border border-dashed border-gray-900/25'} flex justify-center flex-col items-center h-auto`}>
                    {!image && <div className="text-center h-60 flex justify-center items-center flex-col">
                        <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input onChange={onImageUpload} id="file-upload" accept="image/*,.heic,.heif" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                    </div>}
                    {image && <img
                        onError={onImageLoadError}
                        ref={imageRef}
                        className='object-contain h-full w-full max-h-96'
                        src={image}
                        alt="Not found" />

                    }
                </div>
                {image && <button
                    onClick={(e) => { setImage(); e.preventDefault(); setData({ ...data, image: '' }) }}
                    type="button"
                    className="rounded-md mt-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Delete image
                </button>}
                {/* post upload buttons */}
                <div className='mt-5'>
                    <label className="text-red-600 text-sm font-medium ">
                        {error}
                    </label>
                    <div className='w-full flex justify-between items-center mt-2 mb-3'>
                        <button
                            type="button"
                            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => { navigate(-1); }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={onSubmit}
                            disabled={submitStatus}
                            className="cursor-pointer flex mt-5 w-28 justify-center items-center rounded-md h-9 bg-blue-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            {submitStatus ? <span className="loader text-[3px] h-[5px] w-[5px]"></span> :
                                'Create a Post'}
                        </button>
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default CreatePost