import { useNavigate } from 'react-router-dom';
import BookForm from '@/components/BookForm';
import { useCreateBookMutation } from '@/api/booksApi';
import { toast } from 'sonner';
import type { IBook } from '@/interfaces/books.interface';

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  // Fix: specify type as Partial<IBook> instead of any
  const handleSubmit = async (data: Partial<IBook>) => {
    try {
      await createBook(data).unwrap();
      toast.success('Book created successfully!');
      navigate('/books');
    } catch {
      toast.error('Failed to create book.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CreateBook;
