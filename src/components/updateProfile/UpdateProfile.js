import { Image, UserCircleIcon } from 'lucide-react'
import React from 'react'

function UpdateProfile() {
  return (
    <form className='max-w-xl mx-auto pt-8 px-3'>
      <div className="flex flex-col space-y-8">
        {/* header */}
        <h1 className='text-3xl text-zinc-800 font-semibold'>Update Profile</h1>
        {/* dp */}
        <div className="w-full flex flex-col justify-center items-center space-y-3">
          <label htmlFor="photo" className="block text-base font-medium leading-6 text-gray-900 mb-3">
            Profile Photo
          </label>
          <div className="flex items-center gap-x-3">
            <div className='h-24 w-24'>
              <img className="h-24 w-24 rounded-full object-cover"
                src='https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703829600&v=beta&t=HramxGi8yFg0kn5pAZaeu_4hSID3cwCpfjszSUcN1BM'
                alt="dp"
              />
            </div>
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Change
            </button>
          </div>
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
                name="username"
                id="username"
                required
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>
        {/* Name */}
        {/* email */}
        <div>
          <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900 mb-3">
            Name<span className='text-red-600'>*</span>
          </label>
          <input
            id="name"
            name="name"
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
              name="heading"
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
            id="number"
            name="number"
            type="number"
            placeholder='Enter your phone number'
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-7 mb-2 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default UpdateProfile