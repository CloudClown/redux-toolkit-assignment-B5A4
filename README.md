# Minimal Library Management System 📚

A simple and functional **Library Management System** built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**.
This project allows users to view, create, update, delete, and borrow books, and view a summary of borrowed books.

---

## 🚀 Features

### Public Routes
- No authentication required.
- All pages are publicly accessible.

### Book Management
- View a list of all books.
- Add new books.
- Edit existing books.
- Delete books with confirmation.
- Borrow books from the list.

### Borrow Management
- Borrow a book with quantity and due date.
- Cannot borrow more than available copies.
- Automatically updates book availability.
- View borrow summary aggregated by book title and total quantity.

### UI/UX
- Clean and minimal design using **ShadCN** components.
- Responsive layout for mobile, tablet, and desktop.
- Toast notifications for success/error messages.
- Optimistic UI updates for smoother UX.

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React + TypeScript |
| State      | Redux Toolkit + RTK Query |
| Backend    | Node.js + Express |
| Database   | MongoDB + Mongoose |
| Styling    | ShadCN (Tailwind CSS components) |
| Routing    | React Router (v6 Data API) |

---

## 📁 Folder Structure

src/
├─ api/ # RTK Query API slices
├─ components/ # Reusable components (BookForm, Navbar, Table)
├─ interfaces/ # TypeScript interfaces
├─ pages/ # Pages (Home, Books, CreateBook, EditBook, BorrowBook, BorrowSummary)
├─ routes/ # React Router routes
├─ redux/ # Redux store
├─ App.tsx # Main app component
└─ main.tsx # Entry point