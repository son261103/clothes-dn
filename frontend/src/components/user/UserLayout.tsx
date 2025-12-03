import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import UserButton from './UserButton';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <motion.header
        className="bg-gradient-to-r from-bg-primary to-bg-secondary/30 shadow-xl border-b-2 border-border-color/40 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center" data-aos="fade-right">
              <Link to="/" className="text-2xl font-bold text-accent-primary flex items-center group">
                <span className="bg-gradient-to-r from-accent-primary/90 to-accent-secondary text-hover-text w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:from-accent-secondary group-hover:to-accent-primary transition-all duration-300 shadow-lg">
                  C
                </span>
                <span className="text-text-primary group-hover:text-accent-primary transition-colors duration-300">ClothesDN</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block flex-1 max-w-lg mx-10" data-aos="fade-down">
              <ul className="flex justify-center space-x-8">
                <li>
                  <Link
                    to="/"
                    className="text-text-primary hover:text-accent-primary font-medium transition-colors duration-300 relative py-2 group"
                  >
                    Home
                    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-text-primary hover:text-accent-primary font-medium transition-colors duration-300 relative py-2 group"
                  >
                    Products
                    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-text-primary hover:text-accent-primary font-medium transition-colors duration-300 relative py-2 group"
                  >
                    About
                    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-text-primary hover:text-accent-primary font-medium transition-colors duration-300 relative py-2 group"
                  >
                    Contact
                    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4" data-aos="fade-left">
              <Link
                to="/cart"
                className="relative p-2 text-text-primary hover:text-accent-primary transition-colors duration-300 rounded-full hover:bg-bg-secondary/60"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-accent-error text-hover-text text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link>

              <Link to="/profile" className="p-2 text-text-primary hover:text-accent-primary rounded-full hover:bg-bg-secondary/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              <ThemeToggle />

              <UserButton
                variant="primary"
                className="hidden md:block bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary text-hover-text px-4 py-2 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl font-medium"
              >
                Sign In
              </UserButton>

              {/* Mobile menu button */}
              <button className="md:hidden text-text-primary p-2 rounded-md hover:bg-bg-secondary/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu - hidden by default */}
          <div className="md:hidden" data-aos="fade-down" data-aos-delay="300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-accent-primary hover:bg-bg-secondary/60">Home</Link>
              <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-accent-primary hover:bg-bg-secondary/60">Products</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-accent-primary hover:bg-bg-secondary/60">About</Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-accent-primary hover:bg-bg-secondary/60">Contact</Link>
              <div className="pt-4 pb-3 border-t border-border-color/40">
                <UserButton
                  variant="primary"
                  className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary text-hover-text px-4 py-2 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl font-medium"
                >
                  Sign In
                </UserButton>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="bg-bg-primary text-text-primary">
        {children}
        <Outlet />
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-t from-bg-secondary/40 to-bg-primary/80 text-text-secondary pt-20 pb-12 border-t-2 border-border-color/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
            <motion.div
              className="lg:col-span-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-6">
                <span className="bg-gradient-to-r from-accent-primary/90 to-accent-secondary text-hover-text w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  C
                </span>
                <h3 className="text-2xl font-bold text-text-primary">ClothesDN</h3>
              </div>
              <p className="text-text-secondary/90 mb-8 max-w-md text-lg">
                Your one-stop destination for fashionable clothing items that reflect your unique style and personality.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors p-3 rounded-full hover:bg-bg-secondary/60">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors p-3 rounded-full hover:bg-bg-secondary/60">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors p-3 rounded-full hover:bg-bg-secondary/60">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold text-text-primary mb-8 pb-3 border-b-2 border-border-color/40">Shop</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">New Arrivals</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Best Sellers</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Seasonal Collections</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Sale</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Gift Cards</a></li>
              </ul>
            </motion.div>

            <motion.div
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold text-text-primary mb-8 pb-3 border-b-2 border-border-color/40">Customer Service</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Contact Us</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">FAQs</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Shipping Policy</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Returns & Exchanges</a></li>
                <li><a href="#" className="text-text-secondary/90 hover:text-accent-primary transition-colors block py-2 font-medium">Size Guide</a></li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="pt-10 mt-10 border-t-2 border-border-color/40"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="md:flex md:items-center md:justify-between">
              <p className="text-text-secondary/90 text-base">
                &copy; {new Date().getFullYear()} ClothesDN. All rights reserved.
              </p>
              <div className="mt-6 md:mt-0 flex space-x-8">
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary text-base transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary text-base transition-colors font-medium">Terms of Service</a>
                <a href="#" className="text-text-secondary/90 hover:text-accent-primary text-base transition-colors font-medium">Cookie Policy</a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default UserLayout;