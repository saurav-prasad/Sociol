import { Image } from 'lucide-react'
import React, { useState } from 'react'

function CreatePost() {
    const [image, setImage] = useState()
    const onImageUpload = (e) => {
        console.log(e);
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target.result)
                console.log(e);
            }
            reader.readAsDataURL(file)
        }
        else {
            setImage()
        }
    }
    
    return (
        <div className='max-w-md mx-auto px-1  '>
            <h1 className='text-3xl font-semibold pt-5 mb-10'>Create a post</h1>
            <div className="col-span-full mb-7">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Write about your post
                </label>
                <div className="mt-2">
                    <textarea
                        id="about"
                        name="about"
                        rows={5}
                        className="block bg w-full bg-slate-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        defaultValue={''}
                        placeholder='Write a post here...'
                    />
                </div>
            </div>
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
                            <input onChange={onImageUpload} id="file-upload" accept="image/*,.heic,.heif" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                </div>}
                {image && <img
                    onError={()=>{setImage("https://cdn.iconscout.com/icon/free/png-256/free-data-not-found-1965034-1662569.png")}}
                    className='object-contain h-full w-full max-h-96'
                    src={image}
                    alt="Not found" />

                }
            </div>
            {image && <button
                onClick={(e) => { setImage(); e.preventDefault() }}
                type="button"
                className="rounded-md mt-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                Delete image
            </button>}
            <div className='w-full flex justify-between items-center mt-5 mb-3'>
                <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className=" rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                >
                    Create a Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost