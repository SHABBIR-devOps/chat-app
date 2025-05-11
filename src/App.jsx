
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Registion from './pages/Registion'
import ChatingPage from './component/ChatingPage'
import { ToastContainer } from 'react-toastify'
import ForgetPassword from './pages/ForgetPassword'
import Profile from './component/Profile'
import LayoutOne from './Layout/LayoutOne'
import FriendList from './pages/FriendList'
import FriendRequast from './pages/FriendRequast'
import AddFriends from './pages/AddFriends'
import RequastSend from './pages/RequastSend'
import BlockList from './pages/BlockList'
import app from './firebase.config'



function App() {
  const shabbir = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayoutOne/>} >
        <Route index element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registion' element={<Registion/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/chating' element={<ChatingPage/>}/>
        <Route path='/friendslist' element={<FriendList/>}/>
        <Route path='/friendrequast' element={<FriendRequast/>}/>
        <Route path='/addfriends' element={<AddFriends/>}/>
        <Route path='/requastSend' element={<RequastSend/>}/>
        <Route path='/blocklist' element={<BlockList/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )
  

  return (
    <>
     <ToastContainer />
    <RouterProvider router={shabbir}/>
     
    </>
  )
}

export default App
