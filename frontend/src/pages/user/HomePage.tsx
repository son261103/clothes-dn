import React from 'react';
import UserButton from '../../components/user/UserButton';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to ClothesDN</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover our latest collection of fashionable clothing items tailored just for you.
      </p>
      
      <div className="flex justify-center gap-4">
        <UserButton variant="primary">Shop Now</UserButton>
        <UserButton variant="secondary">Learn More</UserButton>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <h3 className="text-lg font-medium mt-4">Product {item}</h3>
            <p className="text-gray-600 mt-2">Description of product {item}</p>
            <UserButton size="sm" className="mt-4">View Details</UserButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;