import type { IBorrow } from '@/interfaces/borrow.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IBorrowPayload {
  book: string;
  quantity: number;
  dueDate: string;
}

interface IBorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-library-management-two.vercel.app/api/borrow' }),
  tagTypes: ['Borrow', 'Books'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, IBorrowPayload>({
      query: (body) => ({
        url: '/borrow',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Borrow', 'Books'],
    }),
    getBorrowSummary: builder.query<IBorrowSummaryItem[], void>({
      query: () => '/borrow',
      transformResponse: (response: { success: boolean; message: string; data: IBorrowSummaryItem[] }) => response.data,
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
