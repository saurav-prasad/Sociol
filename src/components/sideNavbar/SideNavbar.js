import React from 'react'
import { LogOut, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../features/auth/authSlice'

function Navbar({ navbarList }) {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    const handelSignOut = () => {
        window.scroll(0, 0)
        dispatch(signOut())
        localStorage.removeItem('auth-token')
    }

    return (
        <aside className="z-10 h-screen hidden xl:flex fixed w-72 flex-col overflow-y-auto border-r bg-white px-10 py-8">
            {/* header */}
            <h1 className='select-none w-full text-left font-bold text-5xl font-[Whisper] mt-10'>Sociol</h1>
            <div className="mt-10 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-10 ">
                    <div className="space-y-4 ">
                        {/* menu */}
                        {
                            navbarList.map((data, index) =>
                                <Menu key={index} href={data.href} name={data.name} icon={data.icon} />
                            )
                        }
                        {/* profile menu */}
                        <span
                            onClick={() => {
                                navigate(user ? '/profile' : '/auth'); window.scrollTo(0, 0);
                            }}
                            className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            {
                                user ? <img className="h-8 w-8 rounded-full object-cover" src={user.profilePhoto} alt={user.username} /> :
                                    <UserRound className="h-6 w-6" aria-hidden="true" />

                            }
                            <span className="mx-5 text-md font-medium">Profile</span>
                        </span>

                    </div>
                </nav>
                {/* logout button */}
                {
                    user &&
                    <span
                        onClick={handelSignOut}
                        className=" select-none cursor-pointer flex transform mt-3 items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 -translate-x-3"
                    >
                        <LogOut className="h-7 w-7" aria-hidden="true" />
                        <span className="mx-5 text-md font-medium">Sign-out</span>
                    </span>
                }
            </div>
        </aside>
    )
}

export default Navbar

export const Menu = ({ name, icon, href }) => {
    const navigate = useNavigate()

    return (
        <span
            onClick={() => {
                navigate(href); window.scrollTo(0, 0);
            }}
            className={` select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700`}
        >
            {icon}
            <span className="mx-5 text-md font-medium">{name}</span>
        </span>
    )
}