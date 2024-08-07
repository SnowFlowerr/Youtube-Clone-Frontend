import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    value: Cookies.get("access_token")!==undefined?JSON.parse(localStorage.getItem('userData')):JSON.stringify({status:false,data:{}}),
}
export const signSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {

        setSignin: (state, action) => {
            localStorage.setItem('userData',JSON.stringify({status:true,data:action.payload}))
            state.value = (JSON.parse(localStorage.getItem('userData')))
        },
        setSignout: (state, action) => {
            localStorage.setItem('userData',JSON.stringify({status:false,data:{}}))
            state.value = (JSON.parse(localStorage.getItem('userData')))
        },
    },
})
export const { setSignin, setSignout } = signSlice.actions
export default signSlice.reducer