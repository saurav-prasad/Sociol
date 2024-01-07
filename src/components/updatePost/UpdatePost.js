import { Image } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { post } from '../../axios/axios'
import uploadImage from '../../firestoreQuery/uploadImage'
import { updatePost, } from '../../features/post/postSlice'
import deleteImage from '../../firestoreQuery/deleteImage'
import { Zoom } from 'react-awesome-reveal'

function UpdatePost() {
    const [image, setImage] = useState()
    const [data, setData] = useState({ text: '', image: '' })
    const [currImage, setCurrImage] = useState()
    const imageRef = useRef(null)

    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [submitStatus, setSubmitStatus] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    const onImageUpload = (e) => {
        const file = e.target.files[0]
        setCurrImage(file)
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
            if (image && currImage) {
                if (data.image) await deleteImage(data.image, 'post')
                uploadedimage = await uploadImage(currImage, 'post')
            }
            if (!image && !currImage && data.image) await deleteImage(data.image, 'post')

            let uploadData

            if (image && currImage) {
                // console.log("1");
                uploadData = {
                    text: data.text,
                    image: uploadedimage
                }

            }
            else if (!image && !currImage && data.image) {
                // console.log("2");
                uploadData = { text: data.text, image: false }
            }
            else if (image && !currImage) {
                // console.log("3");
                // console.log(data);
                uploadData = {
                    text: data?.text,
                    image: data?.image
                }
            }
            else if (!data?.image) {
                // console.log("4");
                uploadData = {
                    text: data?.text,
                }
            }

            const updatedPost = await post.post(`/updatepost/${params.postid}`, uploadData,
                {
                    headers: {
                        'auth-token': user.token
                    }
                })
            dispatch(updatePost(updatedPost.data.data))
            navigate('/profile')
            setSubmitStatus(false)
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message)
            setSubmitStatus(false)
        }

    }
    const onImageLoadError = () => {
        imageRef.current.src = "https://cdn.iconscout.com/icon/free/png-256/free-data-not-found-1965034-1662569.png"
        setImage()
        setCurrImage()
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let postData = await post.get(`/getpost/${params.postid}`)
                postData = postData.data.data

                setData({
                    text: (postData?.text !== 'false') && postData?.text,
                    image: (postData?.image !== 'false') && postData?.image
                })
                setImage((postData?.image !== 'false') && postData?.image)
            } catch (error) {
                console.log(error);
                setError(error?.response?.data?.message)
                setSubmitStatus(false)
            }

        }
        fetchData()
    }, [params])

    return (
        <Zoom duration={150} triggerOnce>
            <div className='max-w-md mx-auto px-1  '>
                <h1 className='text-3xl font-semibold pt-5 mb-10'>Update a post</h1>
                <div className="col-span-full mb-7">
                    {/* text */}
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        Write about your post
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="text"
                            name="text"
                            onChange={onChange}
                            value={data?.text}
                            rows={5}
                            className="block bg w-full bg-slate-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            placeholder='Write a post here...'
                        />
                    </div>
                </div>
                {/* image */}
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Upload an image
                </label>
                <div className={`mt-5 rounded ${!image && 'border border-dashed border-gray-900/25'} flex justify-center flex-col items-center h-auto`}>
                    {!image && <div className="text-center h-60 flex justify-center items-center flex-col">
                        <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input onChange={onImageUpload} id="file-upload" accept=".jpg, jpeg, .png" type="file" className="sr-only" />
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
                        alt="post " />

                    }
                </div>
                {/* delete image */}
                {image && <button
                    onClick={(e) => { setImage(); e.preventDefault(); setCurrImage() }}
                    type="button"
                    className="rounded-md mt-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Delete image
                </button>}
                {/* buttons */}
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
                                'Update Post'}
                        </button>
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default UpdatePost