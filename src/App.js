import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SigninSignup from './components/signinSignup/SigninSignup';
import SideNavbar from './components/sideNavbar/SideNavbar';
import Test from './components/Test';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import CreatePost from './components/createPost.js/CreatePost';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { HomeIcon, PlusSquare, } from 'lucide-react';
import Post from './components/post/Post';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import { useSelector } from 'react-redux';

function App() {
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
          path: '/signup',
          element: <SigninSignup />
        },
        {
          path: "/signin",
          element: <SigninSignup />
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
    }

  ])
  const {user} = useSelector((state) => state.authReducer)
  console.log(user);
  return (
    <div className="App relative min-h-screen bg-slate-50 text-gray-900">
      {/* <Test /> */}
      {/* <BottomNavbar />
      <SideNavbar /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
