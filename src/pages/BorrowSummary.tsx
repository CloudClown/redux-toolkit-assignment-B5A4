import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetBorrowSummaryQuery } from '@/api/borrowApi';

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8 text-red-500">Failed to load summary.</p>;
  if (!data || data.length === 0) return <p className="p-8">No books borrowed yet.</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Borrow Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
