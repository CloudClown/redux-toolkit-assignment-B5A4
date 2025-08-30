import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/create-book', label: 'Add Book' },
    { path: '/borrow-summary', label: 'Borrow Summary' },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Library Management</div>
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link key={link.path} to={link.path}>
            <Button
              size="sm"
              variant={location.pathname === link.path ? 'default' : 'outline'}
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
