import React, { useEffect, useState } from 'react'
import "./signinSignup.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../features/auth/authSlice'

function SigninSignup() {

    const dispatch = useDispatch()
    const [data, setData] = useState({ username: "", email: "", phone: "", password: "" })
    const [submitStatus, setSubmitStatus] = useState(false)
    const [testSubmitStatus, setTestSubmitStatus] = useState(false)
    const [error, setError] = useState("")
    const pathname = useLocation().pathname
    const { user } = useSelector(state => state.authReducer)
    const [authStatus, setAuthStatus] = useState(false)

    const navigate = useNavigate()

    // signin signup change 
    const onSigninSignupClick = () => {
        setError();
        navigate(pathname === '/auth/signup' ? '/auth/signin' : '/auth/signup')
        setData({ username: "", email: "", phone: "", password: "" })
    }

    const onChange = (e) => {
        setError()
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e?.preventDefault()
        setSubmitStatus(true)
        try {
            // signin
            if (pathname === '/auth/signin') {
                const signinRequest = await auth.post('/getuser', {
                    email: data.email,
                    password: data.password
                })
                const userData = { ...signinRequest.data.data, token: signinRequest.data.token }
                dispatch(signIn(userData))
                setSubmitStatus(false)
                signinRequest && navigate('/profile')
                localStorage.setItem('auth-token', userData.token)
                navigate('/')
            }
            // signup
            else if (pathname === '/auth/signup') {
                const signupRequest = await auth.post('/createuser', {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    phone: data?.phone
                })
                const userData = { ...signupRequest.data.data, token: signupRequest.data.token }
                dispatch(signIn(userData))
                setSubmitStatus(false)
                signupRequest && navigate('/profile')
                localStorage.setItem('auth-token', userData.token)
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message)
            setSubmitStatus(false)
        }
    }


    const testUserSignin = async () => {
        setTestSubmitStatus(true)
        try {
            const signinRequest = await auth.post('/getuser', { email: 'test@test.com', password: 'test123' })
            const userData = { ...signinRequest.data.data, token: signinRequest.data.token }
            dispatch(signIn(userData))

            setError(signinRequest.data?.message)
            setTestSubmitStatus(false)
            navigate('/profile')
            localStorage.setItem('auth-token', userData.token)
            navigate('/')

        } catch (err) {
            setError(error?.response?.data?.message)
            setTestSubmitStatus(false)
        }
    }

    // fetching users data by aut token
    useEffect(() => {
        async function fetchUser() {
            if (localStorage.getItem('auth-token')) {
                setAuthStatus(true)
                try {
                    let signinRequest = await auth.get('/fetchuser', {
                        headers: {
                            'auth-token': localStorage.getItem('auth-token')
                        }
                    })

                    signinRequest = signinRequest.data.data

                    let userData = {
                        ...signinRequest,
                        token: localStorage.getItem('auth-token'),

                    }

                    dispatch(signIn(userData))
                    setAuthStatus(false)
                    navigate('/')

                } catch (error) {
                    console.log(error);
                    setAuthStatus(false)
                }
            }
        }
        fetchUser()
    }, [])

    return (
        <>
            <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {/* header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-16 w-auto"
                        src="/images/letter-s.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {pathname === "/signin" ? 'Sign-in' : 'Sign-up'} in to your account
                    </h2>
                </div>
                {authStatus &&
                    <p className='fixed top-3/4 text-2xl w-full text-center font-semibold text-fuchsia-500'>
                        Loggin-in please wait...
                    </p>}

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {/* username */}
                        {pathname === '/auth/signup' &&
                            <div>
                                <label htmlFor="email" className="flex text-sm font-medium leading-6  text-gray-900">
                                    Username<span className='text-red-600 text-lg'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        onChange={onChange}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        }
                        {/* email */}
                        <div>
                            <label htmlFor="email" className="flex text-sm font-medium leading-6  text-gray-900">
                                Email address<span className='text-red-600 text-lg'>*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={onChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* phone */}
                        {pathname === '/auth/signup' &&
                            <div>
                                <label htmlFor="email" className="flex text-sm font-medium leading-6  text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        onChange={onChange}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>}
                        {/* password */}
                        <div>
                            <div className="flex items-center justify-left">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password<span className='text-red-600 text-lg'>*</span>
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    onChange={onChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* error texts */}
                        <label className="text-red-600 mt-2 text-sm font-medium ">
                            {error}
                        </label>
                        {/* signin signup button */}
                        <div>
                            <button
                                disabled={submitStatus}
                                type="submit"
                                className="cursor-pointer flex w-full justify-center items-center rounded-md h-9 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {submitStatus ? <span className="loader text-[4px] h-[5px] w-[5px]"></span> :
                                    pathname === '/auth/signup' ? "Sign-up" : "Sign-in"}
                            </button>
                            <button
                                disabled={testSubmitStatus}
                                type="button"
                                onClick={testUserSignin}
                                className="cursor-pointer flex mt-5 w-full justify-center items-center rounded-md h-9 bg-blue-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                {testSubmitStatus ? <span className="loader text-[4px] h-[5px] w-[5px]"></span> :
                                    'Sign-in as test user'}
                            </button>
                        </div>
                    </form>

                    {/* signin signup change */}
                    <p className="mt-10 text-center text-sm text-gray-500">
                        {pathname === '/auth/signin' ? `Don't have an account?${' '}` : `Have an account?${' '}`}
                        <span onClick={onSigninSignupClick} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {pathname === "/auth/signup" ? "Sign-in" : "Sign-up"}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SigninSignup