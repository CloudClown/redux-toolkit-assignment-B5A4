// src/pages/BorrowBook.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useBorrowBookMutation } from '@/api/borrowApi';

interface BorrowFormData {
  quantity: number;
  dueDate: string;
}

const BorrowBook: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [formData, setFormData] = useState<BorrowFormData>({
    quantity: 1,
    dueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    try {
      await borrowBook({
        book: bookId,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch {
      toast.error('Failed to borrow book.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? 'Borrowing...' : 'Borrow Book'}
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
