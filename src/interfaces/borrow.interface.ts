export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
