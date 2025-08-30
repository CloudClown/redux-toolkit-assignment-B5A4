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
      <h2 className="text-2xl font-bold mb-6">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity Field */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* Due Date Field */}
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Borrowing..." : "Borrow Book"}
        </Button>
      </form>
    </div>
  );
};

export default BorrowBook;
