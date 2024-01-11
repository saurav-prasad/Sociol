import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SideNavbar from './components/sideNavbar/SideNavbar';
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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, follow, post } from './axios/axios';
import { signIn } from './features/auth/authSlice';
import { createPost } from './features/post/postSlice';
import UpdatePost from './components/updatePost/UpdatePost';
import ProfileByUsername from './components/profileByUsername/ProfileByUsername';
import Network from './components/network/Network';

function App() {
  const dispatch = useDispatch()
  const [authStatus, setAuthStatus] = useState(false)

  // fetching users data
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
          // get total followers
          if (signinRequest) {
            let followersData = await follow.get(`/gettotalfollowers/${signinRequest?.profileId}`)
            followersData = followersData.data.data.totalFollowers

            // get total followings
            let followingData = await follow.get(`/gettotalfollowings/${signinRequest?.profileId}`)
            followingData = followingData.data.data.totalFollowings
            userData = {
              ...userData, followings: followingData,
              followers: followersData
            }
          }

          dispatch(signIn(userData))
          setAuthStatus(false)
        } catch (error) {
          console.log(error);
          setAuthStatus(false)
        }
      }
    }
    fetchUser()
  }, [])

  // fetching all the posts
  useEffect(() => {
    async function fetchUser() {
      let fetchPosts = await post.get('/getallpost')
      dispatch(createPost(fetchPosts?.data?.data))
    }
    fetchUser()
  }, [])

  // navigation bar items
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
          path: "/updatepost/:postid",
          element: <UpdatePost />
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/:username",
          element: <ProfileByUsername />
        },
        {
          path: "/profile/:username/followers",
          element: <Network />
        },
        {
          path: "/profile/:username/followings",
          element: <Network />
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

      {authStatus &&
        <p className='fixed top-3/4 text-2xl w-full text-center font-semibold text-fuchsia-500'>
          Loggin-in please wait...
        </p>}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
