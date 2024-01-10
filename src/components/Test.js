import React from 'react'
import Profiles from './network/Profiles'

function Test() {
    return (
        <div className="">
            <h1 className="mb-4 text-3xl font-semibold text-gray-800 pt-6 ">Followers</h1>
            <div className="flex flex-col mb-60 space-y-6 px-3 border-t pt-7 border-gray-300">
                <Profiles profilePhoto="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" username={"Saurav"} about={"Fullstack"}/>
            </div>
        </div>
    )
}

export default Test