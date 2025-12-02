import { Routes, Route } from 'react-router-dom';
import UserLayout from '../components/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import ProductsPage from '../pages/user/ProductsPage';
import CartPage from '../pages/user/CartPage';

const UserRouter = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Add more user routes here as needed */}
      </Routes>
    </UserLayout>
  );
};

export default UserRouter;