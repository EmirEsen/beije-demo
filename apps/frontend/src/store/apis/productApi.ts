import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductEntity } from '@beije/shared';
import { baseQuery } from './baseApi';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // Products endpoints
        getProducts: builder.query<ProductEntity[], void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
        getProductById: builder.query<ProductEntity, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getProductsBySubcategory: builder.query<ProductEntity[], string>({
            query: (subcategoryId) => `/products?subcategoryId=${subcategoryId}`,
            providesTags: ['Product'],
        }),
        getActiveProducts: builder.query<ProductEntity[], void>({
            query: () => '/products?active=true',
            providesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsBySubcategoryQuery,
    useGetActiveProductsQuery,
} = productApi;
