import React from 'react';
import UserButton from '../../components/user/UserButton';

const ProductsPage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Our Products</h1>
        <p className="text-text-secondary mt-2">Discover our wide range of clothing items</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-cardBg p-6 rounded-lg shadow border borderColor">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">Filters</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-text-primary">Categories</h3>
              <ul className="space-y-2">
                {['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'].map((category) => (
                  <li key={category}>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-accentPrimary" />
                      <span className="ml-2 text-text-secondary">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-text-primary">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-accentPrimary" />
                  <span className="ml-2 text-text-secondary">Under $25</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-accentPrimary" />
                  <span className="ml-2 text-text-secondary">$25 - $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-accentPrimary" />
                  <span className="ml-2 text-text-secondary">$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-accentPrimary" />
                  <span className="ml-2 text-text-secondary">Over $100</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-text-primary">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 border borderColor rounded text-sm hover:bg-bg-secondary text-text-secondary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-cardBg rounded-lg shadow border borderColor overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-bg-secondary border-2 border-dashed border-borderColor w-full h-48" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-text-primary">Product {item}</h3>
                  <p className="text-text-secondary text-sm mt-1">Category: Clothing</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-text-primary">$49.99</span>
                    <UserButton size="sm">Add to Cart</UserButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-1 border borderColor rounded hover:bg-bg-secondary text-text-secondary">Previous</button>
              <button className="px-3 py-1 bg-accentPrimary text-hover-text rounded">1</button>
              <button className="px-3 py-1 border borderColor rounded hover:bg-bg-secondary text-text-secondary">2</button>
              <button className="px-3 py-1 border borderColor rounded hover:bg-bg-secondary text-text-secondary">3</button>
              <button className="px-3 py-1 border borderColor rounded hover:bg-bg-secondary text-text-secondary">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;