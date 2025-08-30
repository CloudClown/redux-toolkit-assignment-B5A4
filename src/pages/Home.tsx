// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1554708153-2917b33a6000?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center text-white space-y-4">
        <h1 className="text-4xl font-bold">Welcome to the Library Management System</h1>
        <p className="text-lg">Manage your books and borrowing efficiently</p>
        <Button size="lg" onClick={() => navigate('/books')}>
          Go to Books
        </Button>
      </div>
    </div>
  );
};

export default Home;
