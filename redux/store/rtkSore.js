// import {configureStore} from '@reduxjs/toolkit'
import {configureStore} from '../rtk-nut/configureStore'
import countReducer from './counterSlice'
export default configureStore({
    reducer:{
        counter: countReducer
    }
})