import { Home, PlusSquare } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function BottomNavbar() {
    const navigate = useNavigate()
    const navbarList = [
        {
            icon: <Home className="h-5 w-5" aria-hidden="true" />,
            name: "Home",
            href: '/post'
        },
        {
            icon: <PlusSquare className="h-5 w-5" aria-hidden="true" />,
            name: "Create",
            href: "/createpost"
        },
        {
            icon: <img className="h-6 w-6 rounded-full object-cover" src='https://scontent.cdninstagram.com/v/t39.30808-6/411117180_18401964661006330_5999756429314918776_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gD2e-uhIfYMAX_Nd21r&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI1ODM3NzE1NzY3MTI3NDY2Nw%3D%3D.2-ccb7-5&oh=00_AfAZ-tSxWb9vjgAgShNTfa1wJke7ky9IK6L4AQBpgcMqmQ&oe=6585C199&_nc_sid=10d13b' alt='dp' />,
            name: "Profile",
            href: '/signin'
        },
    ]
    return (
        <aside className="z-10 xl:hidden fixed bottom-0 w-screen border-t bg-white ">
            <div className="space-x-4 flex justify-around max-w-lg mx-auto">
                {
                    navbarList.map((data) =>
                            <span
                            onClick={()=>navigate(data.href)}
                                className="cursor-pointer flex flex-col transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 select-none hover:bg-gray-100 hover:text-gray-700"
                            >
                                {data.icon}
                                <span className=" text-xs font-normal">{data.name}</span>
                            </span>
                    )
                }
            </div>
        </aside>
    )
}


export default BottomNavbar