import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}
export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {

        showMenu: (state, action) => {
            state.value = !state.value
        },
    },
})
export const { showMenu } = menuSlice.actions
export default menuSlice.reducer