import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../axios/axios'
import uploadImage from '../../firestoreQuery/uploadImage'
import { updateUser } from '../../features/auth/authSlice'
import { updatePostByProfileId } from '../../features/post/postSlice'
import deleteImage from '../../firestoreQuery/deleteImage'
import { Zoom } from 'react-awesome-reveal'

function UpdateProfile() {
  const [data, setData] = useState({ name: '', username: '', email: '', phone: '', about: '', bio: '', profilePhoto: '' })
  const { user } = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [imageError, setImageError] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState()
  const fileInputRef = useRef(null);
  const testImageRef = useRef(null);
  const navigate = useNavigate()
  const [updateStatus, setUpdateStatus] = useState(false)
  const [preImage, setPreImage] = useState()

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    setUpdateStatus(true)
    setError()
    e.preventDefault()
    try {
      let image;
      if (profilePhoto) {
        if (preImage.startsWith('https://firebasestorage.googleapis.com')) await deleteImage(preImage, 'profilePhoto')
        image = await uploadImage(profilePhoto, 'profilePhoto')
      }

      const updateprofileData = await profile.post('/updateprofile',
        profilePhoto ?
          { ...data, profilePhoto: image } :
          {
            name: data?.name,
            username: data?.username,
            email: data?.email,
            phone: data?.phone,
            about: data?.about,
            bio: data?.bio,
          },
        {
          headers: {
            'auth-token': user.token
          }
        })

      dispatch(updateUser(updateprofileData.data.data))
      dispatch(updatePostByProfileId({
        username: updateprofileData.data.data.username,
        about: updateprofileData.data.data?.about,
        profilePhoto: updateprofileData.data.data.profilePhoto,
        profileId: updateprofileData.data.data._id,
      }))

      navigate('/profile')
      setUpdateStatus(false)
    } catch (error) {
      console.log(error);
      setUpdateStatus(false)
      setError(error?.response?.data?.message)
    }

  }

  useEffect(() => {
    setData({
      name: user?.name,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      about: user?.about,
      bio: user?.bio,
      profilePhoto: user?.profilePhoto
    })
    setPreImage(user?.profilePhoto)
  }, [user])

  const onImageUpload = (e) => {
    const file = e.target.files[0]
    setProfilePhoto(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        testImageRef.current.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

  const handelImageError = (e) => {
    setProfilePhoto()
    setImageError(true)
    testImageRef.current.src = data.profilePhoto
  }

  const handelImageLoad = (e) => {
    setData({ ...data, profilePhoto: testImageRef.current.src })
  }

  const onCancel = () => {
    setData({ name: '', username: '', email: '', phone: '', about: '', bio: '', profilePhoto: '' })
    navigate(-1)
  }

  return (
    <Zoom duration={150} triggerOnce>

      <form onSubmit={onSubmit} className='max-w-xl mx-auto pt-8 px-3'>
        <div className="flex flex-col space-y-8">
          {/* header */}
          <h1 className='text-3xl text-zinc-800 font-semibold'>Update Profile</h1>
          {/* profile photo */}
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <label htmlFor="photo" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Profile Photo
            </label>
            <div className="flex items-center gap-x-3">
              <div className='h-24 w-24'>
                <img className="h-24 w-24 rounded-full border p-1 border-y-purple-600 border-x-violet-500 object-cover"
                  src={data.profilePhoto}
                  alt="dp"
                  onLoad={() => setImageError(false)}
                />

                <img className="hidden"
                  ref={testImageRef}
                  alt="dp"
                  onError={handelImageError}
                  onLoad={handelImageLoad}
                />

              </div>
              <input
                accept='.png, .jpg, jpeg'
                className='hidden'
                type="file"
                id="fileInput"
                onChange={onImageUpload}
                ref={fileInputRef}
              />
              <button
                onClick={handleButtonClick}
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
            {
              imageError && <label className="text-red-600 text-sm font-medium ">
                Only use .jpg, .png, jpeg format
              </label>
            }
          </div>
          {/* username */}
          <div className=''>
            <label htmlFor="username" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Username<span className='text-red-600'>*</span>
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">socioll.vercel.app/</span>
                <input
                  type="text"
                  value={data.username}
                  readonly
                  name="username"
                  id="username"
                  required
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="username"
                />
              </div>
            </div>
          </div>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Name<span className='text-red-600'>*</span>
            </label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={onChange}
              type="text"
              required
              placeholder='Enter your name'
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {/* about */}
          <div>
            <label htmlFor="heading" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Profile heading
            </label>
            <div className="mt-2">
              <textarea
                id="heading"
                name="about"
                onChange={onChange}
                value={data.about}
                rows={2}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                placeholder='What will be your profile heading'
              />
            </div>
          </div>
          {/* bio */}
          <div>
            <label htmlFor="bio" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Bio
            </label>
            <div className="mt-2">
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={data.bio}
                onChange={onChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                placeholder='Write a few sentences about yourself.'
              />
            </div>
          </div>
          {/* email */}
          <div>
            <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Email<span className='text-red-600'>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={data.email}
              readonly
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder='Enter your email'
            />
          </div>
          {/* phone */}
          <div>
            <label htmlFor="phone" className="block text-base font-medium leading-6 text-gray-900 mb-3">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="number"
              value={data.phone}
              onChange={onChange}
              placeholder='Enter your phone number'
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {/* errors */}
          <label className="text-red-600 text-sm font-medium ">
            {error}
          </label>
        </div>
        <div className="mt-2 mb-2 flex items-center justify-end gap-x-6">
          <button disabled={updateStatus} onClick={onCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateStatus}
            className="flex justify-center items-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-9 w-16"
          >
            {updateStatus ? <span className="loader text-[3px] h-[5px] w-[5px]"></span> :
              'Save'}
          </button>
        </div>
      </form>
    </Zoom>
  )
}

export default UpdateProfile