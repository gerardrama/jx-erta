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
    }),
    overrideExisting: false,
})

export const {
    useLoginMutation,
    useLazyLogoutQuery,
} = endpoints