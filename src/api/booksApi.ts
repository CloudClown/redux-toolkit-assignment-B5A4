import type { IBook } from "@/interfaces/books.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-library-management-two.vercel.app/api/books",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      transformResponse: (response: { success: boolean; message: string; data: IBook[] }) => response.data,
      providesTags: ["Books"],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { success: boolean; message: string; data: IBook }) => response.data,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<IBook, { id: string; body: Partial<IBook> }>({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ success: boolean; data: null }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
