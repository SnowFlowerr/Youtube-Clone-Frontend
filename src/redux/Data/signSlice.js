import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: ""
}
export const signSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {

        setSignin: (state, action) => {
            state.value = action.payload
        },
        setSignout: (state, action) => {
            state.value = ""
        },
    },
})

export const { setSignin, setSignout } = signSlice.actions
export default signSlice.reducer