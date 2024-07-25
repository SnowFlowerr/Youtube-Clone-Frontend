import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: JSON.parse(localStorage.getItem('theme'))!==null?JSON.parse(localStorage.getItem('theme')):true,
}
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

        changeTheme: (state, action) => {
            localStorage.setItem('theme',!state.value)
            state.value = (JSON.parse(localStorage.getItem('theme')))
        },
    },
})
export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer