import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SigninSignup from './components/signinSignup/SigninSignup';
import Post from './components/post/Post';
import SideNavbar from './components/sideNavbar/SideNavbar';
import Test from './components/Test';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import CreatePost from './components/createPost.js/CreatePost';
import Home from './components/home/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <BottomNavbar />
        <SideNavbar />
        <Home/>
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
          path: "/post",
          element: <>
            <Post />
            <Post />
            <Post />
          </>
        },
        {
          path: "/createpost",
          element: <CreatePost />
        }]
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
