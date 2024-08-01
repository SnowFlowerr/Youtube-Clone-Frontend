import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}
export const micSlice = createSlice({
    name: 'mic',
    initialState,
    reducers: {

        setMic: (state, action) => {
            state.value = !state.value
        },
        offMic: (state, action) => {
            state.value = false
        },
    },
})
export const { setMic,offMic } = micSlice.actions
export default micSlice.reducer