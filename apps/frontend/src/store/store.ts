import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { productApi } from './apis/productApi';
import { mainCategoryApi } from './apis/mainCategoryApi';
import { subCategoryApi } from './apis/subCategoryApi';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // RTK Query APIs
        [productApi.reducerPath]: productApi.reducer,
        [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
        [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            mainCategoryApi.middleware,
            subCategoryApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
