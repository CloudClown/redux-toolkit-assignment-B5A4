import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '@/components/BookForm';
import { toast } from 'sonner';
import type { IBook } from '@/interfaces/books.interface';
import {  useGetBookByIdQuery, useUpdateBookMutation } from '@/api/booksApi';

const EditBook = () => {
  // Use the correct param name
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading: isFetching } = useGetBookByIdQuery(bookId!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [initialData, setInitialData] = useState<IBook | null>(null);

  useEffect(() => {
    if (book) {
      setInitialData(book);
    }
  }, [book]);

  const handleSubmit = async (data: Partial<IBook>) => {
    if (!bookId) return;

    try {
      await updateBook({ id: bookId, body: data }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch {
      toast.error('Failed to update book.');
    }
  };

  if (isFetching) return <p>Loading book...</p>;
  if (!initialData) return <p>Book not found.</p>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
      <BookForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default EditBook;
