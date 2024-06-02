// import { Faq, News, Product, StoreInfo, Testimonial, User } from '../../shared/models'
import {api} from './api'


const endpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query<any, void>({
            query: () => `users`,
        }),
        // ================= AUTH =================
        login: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),
        getRoles: builder.query<any, void>({
            query: () => `roles`,
        }),
        getDepartments: builder.query<any, void>({
            query: () => `departments`,
        }),
        // loginAdmin: builder.mutation({
        //     query: (body) => ({
        //         url: `${ADMIN_URL}/login`,
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // getAllUsers: builder.query<User[], void>({
        //     query: () => `${ADMIN_URL}/users`,
        // }),
        // getAllStoreInfo: builder.query<StoreInfo[], void>({
        //     query: () => `${ADMIN_URL}/products-info`,
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
    useGetDepartmentsQuery,
    useGetEmployeesQuery,
    useLoginMutation,
    useLazyLogoutQuery,
    useCreateEmployeeMutation,
    useGetRolesQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation
} = endpoints