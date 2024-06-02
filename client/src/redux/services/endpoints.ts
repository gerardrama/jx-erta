// import { Faq, News, Product, StoreInfo, Testimonial, User } from '../../shared/models'
import {api} from './api'


const endpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),
        logout: builder.query<any, void>({
            query: () => `auth/logout`,
        }),
        createEmployee: builder.mutation({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLoginMutation,
    useLazyLogoutQuery,
    useCreateEmployeeMutation,
} = endpoints