import { createApi } from '@reduxjs/toolkit/query/react';
import { IMainCategory } from '@beije/shared';
import { baseQuery } from './baseApi';

export const mainCategoryApi = createApi({
    reducerPath: 'mainCategoryApi',
    baseQuery,
    tagTypes: ['MainCategory'],
    endpoints: (builder) => ({
        // Main Categories endpoints
        getMainCategories: builder.query<IMainCategory[], void>({
            query: () => '/main-categories',
            providesTags: ['MainCategory'],
        }),
        getMainCategoryById: builder.query<IMainCategory, string>({
            query: (id) => `/main-categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'MainCategory', id }],
        }),
    }),
});

export const {
    useGetMainCategoriesQuery,
    useGetMainCategoryByIdQuery,
} = mainCategoryApi;
