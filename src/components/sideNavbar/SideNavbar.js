import React from 'react'
import { PlusSquare, Home, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({navbarList}) {
    const navigate = useNavigate()
   
    return (
        <aside className="z-10 h-screen hidden xl:flex fixed w-72 flex-col overflow-y-auto border-r bg-white px-10 py-8">
            <h1 className='w-full text-left font-bold text-5xl font-[Whisper] mt-10'>Sociol</h1>
            <div className="mt-10 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-10 ">
                    <div className="space-y-4 ">
                        {
                            navbarList.map((data) =>
                                <span
                                onClick={()=>navigate(data.href)}
                                    className="cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    {data.icon}
                                    <span className="mx-5 text-md font-medium">{data.name}</span>
                                </span>
                            )
                        }
                    </div>
                </nav>
                <span
                    className="cursor-pointer flex transform mt-3 items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 -translate-x-3"
                    href="#"
                >
                    <LogOut className="h-7 w-7" aria-hidden="true" />
                    <span className="mx-5 text-md font-medium">Logout</span>
                </span>
            </div>
        </aside>
    )
}

export default Navbar