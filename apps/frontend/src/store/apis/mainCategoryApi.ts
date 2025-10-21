import { createApi } from '@reduxjs/toolkit/query/react';
import { MainCategoryEntity } from '@beije/shared';
import { baseQuery } from './baseApi';

export const mainCategoryApi = createApi({
    reducerPath: 'mainCategoryApi',
    baseQuery,
    tagTypes: ['MainCategory'],
    endpoints: (builder) => ({
        // Main Categories endpoints
        getMainCategories: builder.query<MainCategoryEntity[], void>({
            query: () => '/main-categories',
            providesTags: ['MainCategory'],
        }),
        getMainCategoryById: builder.query<MainCategoryEntity, string>({
            query: (id) => `/main-categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'MainCategory', id }],
        }),
    }),
});

export const {
    useGetMainCategoriesQuery,
    useGetMainCategoryByIdQuery,
} = mainCategoryApi;
