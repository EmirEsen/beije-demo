import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for the backend
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

// Shared base query configuration
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
});
