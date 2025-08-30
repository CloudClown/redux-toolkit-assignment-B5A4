import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useBorrowBookMutation } from '@/api/borrowApi';
import { Button } from '@/components/ui/button';

interface BorrowFormData {
  quantity: number;
  dueDate: string;
}

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [formData, setFormData] = useState<BorrowFormData>({
    quantity: 1,
    dueDate: "",
  });

  // ✅ Handle form changes safely
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // ✅ Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) {
      toast.error("Invalid book ID. Please try again.");
      return;
    }

    // ✅ Prevent selecting past dates
    const today = new Date();
    const selectedDate = new Date(formData.dueDate);
    if (selectedDate < today) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    try {
       await borrowBook({
        book: bookId,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch  {
      const errorMessage =
        "Failed to borrow the book. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
  <h2 className="text-3xl font-bold mb-8 text-gray-900">Borrow Book</h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Quantity Field */}
    <div className="flex flex-col">
      <label htmlFor="quantity" className="text-sm font-medium mb-2 text-gray-700">
        Quantity
      </label>
      <input
        id="quantity"
        type="number"
        name="quantity"
        min={1}
        value={formData.quantity}
        onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        required
      />
    </div>

    {/* Due Date Field */}
    <div className="flex flex-col">
      <label htmlFor="dueDate" className="text-sm font-medium mb-2 text-gray-700">
        Due Date
      </label>
      <input
        id="dueDate"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        required
      />
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? "Borrowing..." : "Borrow Book"}
    </Button>
  </form>
</div>

  );
};

export default BorrowBook;
