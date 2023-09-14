import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import { apiSlice } from "../slices/apiSlice";
import TaskSlice from "../slices/taskSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        task: TaskSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;