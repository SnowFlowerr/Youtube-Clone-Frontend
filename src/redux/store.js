import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './Data/menuSlice'
import themeReducer from './Data/themeSlice'
import micReducer from './Data/micSlice'
import signReducer from './Data/signSlice'


// configureStore from Redux Toolkit simplifies the process of setting up a Redux store by providing sensible defaults and enabling features like Immer and Redux DevTools Extension out of the box. It also reduces the amount of boilerplate code needed to set up your store.

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        theme:themeReducer,
        mic:micReducer,
        sign:signReducer
    },
})