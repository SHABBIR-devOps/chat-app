import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../pages/Navbar'

const LayoutOne = () => {
const off = useSelector((state)=>state.prity.peraDitase)

const navigate = useNavigate()

useEffect(()=>{
  if(off == null){
    navigate('/login')
  }
},[])





  return (
    <>

    <div className="flex">
          
          <Outlet/>
    </div>


      
    </>
  )
}

export default LayoutOne
