import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';

// Protected route wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/products" element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        } />
        <Route path="/add-product" element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        } />
        <Route path="/orders" element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        } />
      </Routes>
   
  );
}