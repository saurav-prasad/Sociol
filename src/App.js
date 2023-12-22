import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
    {
      icon: <img className="h-8 w-8 rounded-full object-cover" src='https://media.licdn.com/dms/image/D4D35AQGjCohxNWch7w/profile-framedphoto-shrink_100_100/0/1701414168395?e=1703829600&v=beta&t=HramxGi8yFg0kn5pAZaeu_4hSID3cwCpfjszSUcN1BM' alt='dp' />,
      name: "Profile",
      href: '/profile'
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
          element: ""
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
