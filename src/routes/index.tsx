import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import CreateBook from '@/pages/CreateBook';
import EditBook from '@/pages/EditBook';
import BorrowBook from '@/pages/BorrowBook';
import BorrowSummary from '@/pages/BorrowSummary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // wrapper layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/books', element: <Books /> },
      { path: '/create-book', element: <CreateBook /> },
      { path: '/edit-book/:bookId', element: <EditBook /> },
      { path: '/borrow/:bookId', element: <BorrowBook /> },
      { path: '/borrow-summary', element: <BorrowSummary /> },
    ],
  },
]);

export default router;
