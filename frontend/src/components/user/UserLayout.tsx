import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import UserButton from './UserButton';
import ThemeToggle from './ThemeToggle';

interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">ClothesDN</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link></li>
              <li><Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">Products</Link></li>
              <li><Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link></li>
              <li><Link to="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium">
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link></li>
              <li><Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserButton variant="secondary" size="sm">Sign In</UserButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ClothesDN</h3>
              <p className="text-gray-600">Your one-stop destination for fashionable clothing items.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">New Arrivals</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Best Sellers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Shipping Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="text-gray-600 not-italic">
                123 Fashion Street<br />
                Style City, SC 12345<br />
                Email: info@clothesdn.com<br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()} ClothesDN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;