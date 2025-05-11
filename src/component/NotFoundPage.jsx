import Lottie from 'lottie-react'
import NotFoundAnimetion from '../../public/animetion/notFundAnimetion.json'
import React from 'react'

const NotFoundPage = () => {
  return (
    <>
    <div className=" w-[1532px] flex justify-center h-[729px] bg-white ">
        <Lottie className='w-[1000PX]  ' animationData={NotFoundAnimetion}/>
    </div>

    </>
  )
}

export default NotFoundPage
