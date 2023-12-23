import React, { useEffect, useState } from 'react'
import "./signinSignup.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, profile } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../features/auth/authSlice'

function SigninSignup() {
    const dispatch = useDispatch()
    const [data, setData] = useState({ username: "", email: "", phone: "", password: "" })
    const [submitStatus, setSubmitStatus] = useState(false)
    const [error, setError] = useState("")
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    const onChange = (e) => {
        setError()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setSubmitStatus(true)
        try {

            if (pathname === '/signin') {
                console.log(data);
                const signinRequest = await auth.post('/getuser', {
                    email: data.email,
                    password: data.password
                })
                const userData = { ...signinRequest.data.data, token: signinRequest.data.token }
                dispatch(signIn(userData))

                setError(signinRequest.data?.message)
                setSubmitStatus(false)
                navigate('/profile')
            }
            else if (pathname === '/signup') {
                console.log(data);
                const signupRequest = await auth.post('/createuser', {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    phone: data?.phone
                })

                const userData = { ...signupRequest.data.data, token: signupRequest.data.token }
                dispatch(signIn(userData))
                setError(signupRequest.data?.message)
                setSubmitStatus(false)
                navigate('/profile')
            }
        } catch (error) {
            setError(error?.response?.data?.message)
            setSubmitStatus(false)
        }
    }
    const { user } = useSelector(state => state.authReducer)
    useEffect(() => {
        if (user) {
            navigate(-1)
        }
    })

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {pathname === '/signup' &&
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
                        {pathname === "/signup" &&
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
                        <label className="text-red-600 mt-2 text-sm font-medium ">
                            {error}
                        </label>
                        <div>
                            <button
                                disabled={!setSubmitStatus}
                                type="submit"
                                className="flex w-full justify-center items-center rounded-md h-9 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {submitStatus ? <span class="loader"></span> :
                                    pathname === "/signup" ? "Sign-up" : "Sign-in"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {pathname === "/signin" ? `Don't have an account?${' '}` : `Have an account?${' '}`}
                        <Link onClick={() => setError()} to={pathname === "/signup" ? "/signin" : "/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {pathname === "/signup" ? "Sign-in" : "Sign-up"}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SigninSignup