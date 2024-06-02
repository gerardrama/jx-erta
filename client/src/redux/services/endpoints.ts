import { Faq, News, Product, StoreInfo, Testimonial, User } from '../../shared/models'
import {api} from './api'

const ADMIN_URL = 'admin'

const endpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body,
            }),
        }),
        loginAdmin: builder.mutation({
            query: (body) => ({
                url: `${ADMIN_URL}/login`,
                method: 'POST',
                body,
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => `${ADMIN_URL}/users`,
        }),
        getAllStoreInfo: builder.query<StoreInfo[], void>({
            query: () => `${ADMIN_URL}/products-info`,
        }),
        createStoreInfo: builder.mutation<StoreInfo, Partial<StoreInfo>>({
            query: (body) => ({
                url: `${ADMIN_URL}/product-info`,
                method: 'POST',
                body,
            }),
        }),
        updateStoreInfo: builder.mutation<StoreInfo, Partial<StoreInfo>>({
            query: (body) => ({
                url: `${ADMIN_URL}/product-info/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteStoreInfo: builder.mutation<number, any>({
            query: (id) => ({
                url: `${ADMIN_URL}/product-info/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => `${ADMIN_URL}/products`,
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: `${ADMIN_URL}/product`,
                method: 'POST',
                body,
            }),
        }),
        updateProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: `${ADMIN_URL}/product/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteProduct: builder.mutation<number, any>({
            query: (id) => ({
                url: `${ADMIN_URL}/product/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllNews: builder.query<News[], void>({
            query: () => `${ADMIN_URL}/news`,
        }),
        createNews: builder.mutation<News, Partial<FormData>>({
            query: (body) => ({
                url: `${ADMIN_URL}/news`,
                method: 'POST',
                body,
                formData:true
            }),
        }),
        updateNews: builder.mutation<News, Partial<FormData>>({
            query: (body) => ({
                url: `${ADMIN_URL}/news/` + body.get('id'),
                method: 'PUT',
                body,
                formData:true
            }),
        }),
        deleteNews: builder.mutation<number, any>({
            query: (id) => ({
                url: `${ADMIN_URL}/news/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllTestimonials: builder.query<Testimonial[], void>({
            query: () => `${ADMIN_URL}/testimonials`,
        }),
        createTestimonial: builder.mutation<Testimonial, Partial<FormData>>({
            query: (body) => ({
                url: `${ADMIN_URL}/testimonial`,
                method: 'POST',
                body,
                formData:true
            }),
        }),
        updateTestimonial: builder.mutation<Testimonial, Partial<FormData>>({
            query: (body) => ({
                url: `${ADMIN_URL}/testimonial/` + body.get('id'),
                method: 'PUT',
                body,
                formData:true
            }),
        }),
        deleteTestimonial: builder.mutation<number, any>({
            query: (id) => ({
                url: `${ADMIN_URL}/testimonial/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllFaq: builder.query<Faq[], void>({
            query: () => `${ADMIN_URL}/faq`,
        }),
        createFaq: builder.mutation<Faq, Partial<Faq>>({
            query: (body) => ({
                url: `${ADMIN_URL}/faq`,
                method: 'POST',
                body,
                formData:true
            }),
        }),
        updateFaq: builder.mutation<Faq, Partial<Faq>>({
            query: (body) => ({
                url: `${ADMIN_URL}/faq/${body.id}`,
                method: 'PUT',
                body,
                formData:true
            }),
        }),
        deleteFaq: builder.mutation<number, any>({
            query: (id) => ({
                url: `${ADMIN_URL}/faq/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateEmployeeMutation,
    useGetAllUsersQuery,
    useGetAllStoreInfoQuery,
    useCreateStoreInfoMutation,
    useUpdateStoreInfoMutation,
    useDeleteStoreInfoMutation,
    useGetAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetAllNewsQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
    useGetAllTestimonialsQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
    useGetAllFaqQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation
} = endpoints