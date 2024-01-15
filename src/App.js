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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { post } from './axios/axios';
import { createPost } from './features/post/postSlice';
import UpdatePost from './components/updatePost/UpdatePost';
import ProfileByUsername from './components/profileByUsername/ProfileByUsername';
import Network from './components/network/Network';
import Likes from './components/likes/Likes';

function App() {
  const dispatch = useDispatch()

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
          path: "/post/:postid/likes",
          element: <Likes />
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
