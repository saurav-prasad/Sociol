import { Power, UserRound } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from '../../features/auth/authSlice'


function BottomNavbar({ navbarList }) {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const pathname = useLocation().pathname

    const handelSignout = () => {
        window.scrollTo(0, 0);
        dispatch(signOut())
        localStorage.removeItem('auth-token')
        navigate('/auth')
    }

    return (
        <aside className="z-10 xl:hidden fixed bottom-0 w-screen border-t bg-white ">
            <div className="space-x-4 flex justify-around items-center max-w-lg mx-auto">
                {/* menus */}
                {
                    navbarList.map((data, index) =>
                        <Menu href={data.href} key={index} name={data.name} icon={data.icon} />
                    )
                }
                {/* profile menu */}
                <span
                    onClick={() => {
                        navigate(user ? '/profile' : '/signin'); window.scrollTo(0, 0);
                    }}
                    className={`${pathname === '/profile' ? 'bg-gray-100 text-gray-700' : ''} cursor-pointer flex flex-col transform items-center rounded-lg px-3 py-1 text-gray-600 transition-colors duration-300 select-none hover:bg-gray-100 hover:text-gray-700`}
                >
                    {
                        user ? <img className="h-8 w-8 rounded-full object-cover" src={user.profilePhoto} alt={user.username} /> :
                            <UserRound className="h-6 w-6" aria-hidden="true" />

                    }
                    <span className=" text-xs font-normal">{user ? 'Profile' : 'Sign-in'}</span>
                </span>
                {/* logout button */}
                {user && <>
                    <span
                        onClick={handelSignout}
                        className="sm:flex hidden cursor-pointer flex-col transform items-center rounded-lg px-3 py-1 text-gray-600 transition-colors duration-300 select-none hover:bg-gray-100 hover:text-gray-700"
                    >
                        <Power className="h-6 w-6" aria-hidden="true" />
                        <span className=" text-xs font-normal">Sign-out</span>
                    </span>
                </>}
            </div>
        </aside>
    )
}


export default BottomNavbar


export const Menu = ({ href, name, icon }) => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname

    const urls = {
        Create: '/createpost',
        Home: '/feed'
    }
    return (
        <span
            onClick={() => { navigate(href); window.scrollTo(0, 0); }}
            className={`${urls[name] === pathname ? 'bg-gray-100 text-gray-700' : ''} cursor-pointer flex flex-col transform items-center rounded-lg px-3 py-1 text-gray-600 transition-colors duration-300 select-none hover:bg-gray-100 hover:text-gray-700`}
        >
            {icon}
            <span className=" text-xs font-normal">{name}</span>
        </span>
    )
}