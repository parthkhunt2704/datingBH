import { createSlice } from '@reduxjs/toolkit'


export const localStorageSlice = createSlice({
    name: 'localStorage',
    initialState : {
        userData:localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {},
        userinterest: [],
        userlanguage: [],
        userpicture: [],
      },
    reducers: {
        saveuserData:(state,action) => {
            console.log("action",action);
            state.userData = action?.payload
        },
        saveuserInterest:(state,action) => {
            console.log("action",action);
            state.userinterest = action?.payload
        },
        saveuserLanguage:(state,action) => {
            console.log("action",action);
            state.userlanguage = action?.payload
        },
        saveuserPicture:(state,action) => {
            console.log("action",action);
            state.userpicture = action?.payload
        },
        logoutUser:(state,action) => {
            state.userData = {}
            state.userinterest = []
            state.userlanguage = []
            state.userpicture = []
        }
    },
})
export const { saveuserData,saveuserPicture,saveuserInterest,saveuserLanguage,logoutUser } = localStorageSlice.actions;
export const userInfo = (state) => state?.localStorage?.userData;
export const userInterest = (state) => state?.localStorage?.userinterest;
export const userLanguage = (state) => state?.localStorage?.userlanguage;
export const userPicture = (state) => state?.localStorage?.userpicture;
export default localStorageSlice.reducer;