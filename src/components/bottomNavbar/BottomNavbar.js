import { Home, PlusSquare } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function BottomNavbar({navbarList}) {
    const navigate = useNavigate()
    return (
        <aside className="z-10 xl:hidden fixed bottom-0 w-screen border-t bg-white ">
            <div className="space-x-4 flex justify-around items-center max-w-lg mx-auto">
                {
                    navbarList.map((data) =>
                            <span
                            onClick={()=>navigate(data.href)}
                                className="cursor-pointer flex flex-col transform items-center rounded-lg px-3 py-1 text-gray-600 transition-colors duration-300 select-none hover:bg-gray-100 hover:text-gray-700"
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