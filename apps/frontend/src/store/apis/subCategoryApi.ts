import { createApi } from '@reduxjs/toolkit/query/react';
import { SubCategoryEntity } from '@beije/shared';
import { baseQuery } from './baseApi';

export const subCategoryApi = createApi({
    reducerPath: 'subCategoryApi',
    baseQuery,
    tagTypes: ['SubCategory'],
    endpoints: (builder) => ({
        // Sub Categories endpoints
        getSubCategories: builder.query<SubCategoryEntity[], void>({
            query: () => '/sub-categories',
            providesTags: ['SubCategory'],
        }),
        getSubCategoryById: builder.query<SubCategoryEntity, string>({
            query: (id) => `/sub-categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'SubCategory', id }],
        }),
        getSubCategoriesByMainCategory: builder.query<SubCategoryEntity[], string>({
            query: (mainCategoryId) => `/sub-categories?mainCategoryId=${mainCategoryId}`,
            providesTags: ['SubCategory'],
        }),
    }),
});

export const {
    useGetSubCategoriesQuery,
    useGetSubCategoryByIdQuery,
    useGetSubCategoriesByMainCategoryQuery,
} = subCategoryApi;
