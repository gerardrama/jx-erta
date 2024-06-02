// import { Faq, News, Product, StoreInfo, Testimonial, User } from '../../shared/models'
import {api} from './api'


const endpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        // ================= AUTH =================
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

        // ================= DEPARTMENT =================
        getDepartments: builder.query<any, void>({
            query: () => `departments`,
        }),
        createDepartment: builder.mutation({
            query: (body) => ({
                url: `departments`,
                method: 'POST',
                body,
            }),
        }),
        updateDepartment: builder.mutation({
            query: (body) => ({
                url: `departments/${body.id}`,
                method: 'PUT',
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
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation
} = endpoints