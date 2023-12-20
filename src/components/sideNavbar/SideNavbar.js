import React from 'react'
import { PlusSquare, Home, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const navbarList = [
        {
            icon: <Home className="h-7 w-7" aria-hidden="true" />,
            name: "Home",
            href: '/post'
        },
        {
            icon: <PlusSquare className="h-7 w-7" aria-hidden="true" />,
            name: "Create",
            href: '/createpost'
        },
        {
            icon: <img className="h-9 w-9 rounded-full object-cover" src='https://scontent.cdninstagram.com/v/t39.30808-6/411117180_18401964661006330_5999756429314918776_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gD2e-uhIfYMAX_Nd21r&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI1ODM3NzE1NzY3MTI3NDY2Nw%3D%3D.2-ccb7-5&oh=00_AfAZ-tSxWb9vjgAgShNTfa1wJke7ky9IK6L4AQBpgcMqmQ&oe=6585C199&_nc_sid=10d13b' alt='dp' />,
            name: "Profile",
            href: '/signin'
        },
    ]
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