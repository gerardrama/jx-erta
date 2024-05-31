import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
// import { clearToken } from '../reducers/auth';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DOMAIN_API ?? 'http://localhost:4000/',
    prepareHeaders: (headers, { getState }) => {

        // headers.set('Access-Control-Allow-Origin', '*');
        // headers.set('Access-Control-Allow-Credentials', 'true');
        // headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, locale');
        // headers.set('Access-Control-Allow-Methods', '*');

        // headers.set("Content-Type", "multipart/form-data");

        headers.set("Accept", "application/json");

        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', token);
        }
        return headers
    }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 400 || result.error?.status === 401 || result.error?.status === 402 || result.error?.status === 403) {
        localStorage.removeItem('token');
        // api.dispatch(clearToken());
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})