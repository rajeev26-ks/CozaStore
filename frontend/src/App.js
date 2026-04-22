import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './component/layout/Layout';
import Home from './component/home/Home';
import About from './component/about/About';
import Contact from './component/contact/Contact';
import Product from './component/product/Product';
import Checkout from './component/checkout/Checkout';
import Cart from './component/cart/Cart';
import Login from './component/login/Login';
import Signup from './component/sign/Signup';   // assuming the file is at this path
import ForgotPassword from './pages/ForgotPassword';
import EmailSent from './pages/EmailSent';
import ResetPassword from './pages/ResetPassword';
import PasswordSuccess from './pages/PasswordSuccess';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />   {/* ← fixed */}

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="forgot-password/email-sent" element={<EmailSent />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="forgot-password/success" element={<PasswordSuccess />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;