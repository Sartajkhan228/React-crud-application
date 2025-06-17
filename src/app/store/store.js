import { configureStore } from '@reduxjs/toolkit';
// import toDoReducer from '../../features/todoslice';
import counterReducer from '../../features/counterSlice';
import { dataBaseApiSlice, /*productApiSlice*/ } from '../../features/apiSlice';
// import authReducer from '../../features/authSlice';


export const store = configureStore({

    reducer: {
        // todoStorData: toDoReducer,
        counter: counterReducer,
        // auth: authReducer,
        // [productApiSlice.reducerPath]: productApiSlice.reducer,
        [dataBaseApiSlice.reducerPath]: dataBaseApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dataBaseApiSlice.middleware),
});