import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SigninSignup from './components/signinSignup/SigninSignup';
import SideNavbar from './components/sideNavbar/SideNavbar';
import Test from './components/Test';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import CreatePost from './components/createPost.js/CreatePost';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { HomeIcon, PlusSquare,  } from 'lucide-react';
import Post from './components/post/Post';

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
      icon: <img className="h-8 w-8 rounded-full object-cover" src='https://scontent.cdninstagram.com/v/t39.30808-6/411117180_18401964661006330_5999756429314918776_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=gD2e-uhIfYMAX_Nd21r&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI1ODM3NzE1NzY3MTI3NDY2Nw%3D%3D.2-ccb7-5&oh=00_AfAZ-tSxWb9vjgAgShNTfa1wJke7ky9IK6L4AQBpgcMqmQ&oe=6585C199&_nc_sid=10d13b' alt='dp' />,
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
          <Post/>
          </>
        },
        {
          path: "/createpost",
          element: <CreatePost />
        },
        {
          path: "/profile",
          element: <Profile />
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
