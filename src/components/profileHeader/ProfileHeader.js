import { Power } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function ProfileHeader() {
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelSignout = () => {
        window.scroll(0, 0)
        dispatch(signOut())
        localStorage.removeItem('auth-token')
    }

    return (
        <>
            {/* Profile page header */}
            <div className='max-w-xl mx-auto'>

                < div className='sm:hidden flex flex-row justify-between items-center px-2 py-1 mb-5 border-b bg-white' >
                    <h1 className='w-full text-left font-bold text-3xl font-[Whisper] select-none'>Sociol</h1>
                    {/* logout button */}
                    {
                        user && <div>
                            <Power onClick={handelSignout} strokeWidth={3} className='' />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileHeader