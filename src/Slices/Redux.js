import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    peraDitase: JSON.parse(localStorage.getItem('userLoginData')) ? JSON.parse(localStorage.getItem('userLoginData')) : null 
  },
  reducers: {

    CurrentUserLoginData: (state, action) => {
      state.peraDitase = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {CurrentUserLoginData} = counterSlice.actions

export default counterSlice.reducer
