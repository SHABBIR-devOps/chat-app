import { configureStore } from '@reduxjs/toolkit'
import shanto from './Slices/Redux' 
import chat from './Slices/SliceForChat' 

export default configureStore({
  reducer: {
    prity: shanto,
    UserChat: chat,
  },
})
