import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;