import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoSlice";
//Store
const store = configureStore({
    reducer: {
        todoReducer
    }
})
//Export
export default store
