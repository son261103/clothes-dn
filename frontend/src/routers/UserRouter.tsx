import { Routes, Route } from 'react-router-dom';
import UserLayout from '../components/user/UserLayout';
import HomePage from '../pages/user/HomePage';
import LoginPage from '../pages/user/LoginPage';
import RegisterPage from '../pages/user/RegisterPage';
import ForgotPasswordPage from '../pages/user/ForgotPasswordPage';

const UserRouter = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRouter;
