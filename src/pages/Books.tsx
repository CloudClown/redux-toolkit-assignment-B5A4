import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '@/api/booksApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { IBook } from '@/interfaces/books.interface';

const Books= () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id).unwrap();
      toast.success('Book deleted successfully!');
    } catch {
      toast.error('Failed to delete book.');
    }
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) {
    toast.error('Failed to load books.');
    return <p>Error loading books.</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Books List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data as IBook[]).map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>{book.available ? 'Available' : 'Unavailable'}</TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" onClick={() => navigate(`/edit-book/${book._id}`)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(book._id)}>
                    Delete
                  </Button>
                  <Button size="sm" onClick={() => navigate(`/borrow/${book._id}`)}>
                    Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Books;
