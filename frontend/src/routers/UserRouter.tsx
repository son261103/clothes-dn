import { Routes, Route } from 'react-router-dom';
import UserLayout from '../components/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LoginPage from '../pages/user/LoginPage';
import RegisterPage from '../pages/user/RegisterPage';
import ForgotPasswordPage from '../pages/user/ForgotPasswordPage';
import ProductsPage from '../pages/user/ProductsPage';
import ProductDetailPage from '../pages/user/ProductDetailPage';
import CollectionsPage from '../pages/user/CollectionsPage';
import AboutPage from '../pages/user/AboutPage';
import CartPage from '../pages/user/CartPage';
import CheckoutPage from '../pages/user/CheckoutPage';

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
