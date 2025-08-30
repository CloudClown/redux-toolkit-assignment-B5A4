// src/pages/BooksList.tsx
import React from 'react';
import { useGetBooksQuery, useDeleteBookMutation } from '@/api/booksApi';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { IBook } from '@/interfaces/books.interface';

const BooksList: React.FC = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id).unwrap();
      toast.success('Book deleted successfully!');
    } catch {
      toast.error('Failed to delete the book.');
    }
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Books List</h2>
        <Button onClick={() => navigate('/create-book')}>Add New Book</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Copies</th>
              <th className="px-4 py-2">Available</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book: IBook) => (
              <tr key={book._id} className="text-center border-t border-gray-200">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2">{book.copies}</td>
                <td className="px-4 py-2">{book.available ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <Button size="sm" onClick={() => navigate(`/edit-book/${book._id}`)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                  <Button size="sm" onClick={() => navigate(`/borrow/${book._id}`)}>
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksList;
