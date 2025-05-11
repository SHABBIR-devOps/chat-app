import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'chating',
  initialState: {
    ChatUserSlice: JSON.parse(localStorage.getItem('UserInformetion')) ? JSON.parse(localStorage.getItem('UserInformetion')) : null , 
  },
  reducers: {

    SliceUserChat: (state, action) => {
      state.ChatUserSlice = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {SliceUserChat} = ChatSlice.actions

export default ChatSlice.reducer
