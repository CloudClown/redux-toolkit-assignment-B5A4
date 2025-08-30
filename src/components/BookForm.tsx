import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { IBook } from '@/interfaces/books.interface';

interface BookFormProps {
  initialData?: IBook;
  onSubmit: (data: Partial<IBook>) => void;
  isLoading?: boolean;
}

const genres = [
  'FICTION',
  'NON_FICTION',
  'SCIENCE',
  'HISTORY',
  'BIOGRAPHY',
  'FANTASY',
];

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<IBook>>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      (Object.keys(initialData) as Array<keyof IBook>).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const submitHandler = (data: Partial<IBook>) => {
    if (!data.title || !data.author || !data.genre || !data.isbn || data.copies === undefined) {
      toast.error('Please fill all required fields.');
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-lg mx-auto space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <Input {...register('title')} placeholder="Book title" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Author</label>
        <Input {...register('author')} placeholder="Author name" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Genre</label>
        <Select
          onValueChange={(value) => setValue('genre', value as IBook["genre"])}
          value={watch('genre')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">ISBN</label>
        <Input {...register('isbn')} placeholder="ISBN number" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <Input {...register('description')} placeholder="Optional description" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Copies</label>
        <Input
          type="number"
          {...register('copies', { valueAsNumber: true })}
          placeholder="Number of copies"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
