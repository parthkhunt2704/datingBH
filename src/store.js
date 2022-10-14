import { configureStore } from '@reduxjs/toolkit'
import localStorageSlice from './Redux/LocalStorage/LocalStorageSlice'

export default configureStore({
  reducer: {
    localStorage:localStorageSlice
  },
})