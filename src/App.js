import { Navigate, Route, Router, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import './App.css';
import SideNavbar from './components/sideNavbar/SideNavbar';
import Test from './components/Test';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import CreatePost from './components/createPost.js/CreatePost';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { HomeIcon, PlusSquare, } from 'lucide-react';
import Post from './components/post/Post';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import Error from './components/error/Error';
import Auth from './components/signinSignup/Auth';
import SigninSignup from './components/signinSignup/SigninSignup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './axios';
import { signIn } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchUser() {
      if (localStorage.getItem('auth-token')) {
        try {
          const signinRequest = await auth.get('/fetchuser', {
            headers: {
              'auth-token': localStorage.getItem('auth-token')
            }
          })
          const userData = { ...signinRequest.data.data, token: localStorage.getItem('auth-token') }
          dispatch(signIn(userData))
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUser()
  }, [])

  const navbarList = [
    {
      icon: <HomeIcon className="h-6 w-6" aria-hidden="true" />,
      name: "Home",
      href: '/feed'
    },
    {
      icon: <PlusSquare className="h-6 w-6" aria-hidden="true" />,
      name: "Create",
      href: '/createpost'
    },
  ]
  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <BottomNavbar navbarList={navbarList} />
        <SideNavbar navbarList={navbarList} />
        <Home />
      </>,

      children: [
        {
          path: '/',
          element: <Navigate to="/feed" />,

        },
        {
          path: "/feed",
          element: <>
            <Post />
          </>
        },
        {
          path: "/createpost",
          element: <CreatePost />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/profile/update",
          element: < UpdateProfile />
        }
      ]
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: '/auth',
          element: <Navigate to="/auth/signin" />
        },
        {
          path: '/auth/signin',
          element: <SigninSignup />
        },
        {
          path: '/auth/signup',
          element: <SigninSignup />
        }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ])
  return (
    <div className="App relative min-h-screen bg-slate-50 text-gray-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
