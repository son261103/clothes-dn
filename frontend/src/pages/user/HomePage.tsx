import React from 'react';
import UserButton from '../../components/user/UserButton';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Summer T-Shirt",
      price: "$29.99",
      category: "Tops",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    },
    {
      id: 2,
      name: "Casual Jeans",
      price: "$59.99",
      category: "Bottoms",
      image: "https://images.unsplash.com/photo-1541099649105-69e1d71a75da?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    },
    {
      id: 3,
      name: "Elegant Blazer",
      price: "$89.99",
      category: "Outerwear",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    },
    {
      id: 4,
      name: "Designer Hoodie",
      price: "$49.99",
      category: "Tops",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    }
  ];

  // Categories data
  const categories = [
    {
      id: 1,
      name: "Men's Fashion",
      count: 120,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    },
    {
      id: 2,
      name: "Women's Fashion",
      count: 150,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    },
    {
      id: 3,
      name: "Accessories",
      count: 80,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
    }
  ];

  return (
    <div className="bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bg-secondary to-accent-primary dark:from-bg-primary dark:to-card-bg py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
                Elevate Your <span className="text-accent-secondary">Style</span> with Our Collection
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-lg">
                Discover the latest trends and timeless pieces that reflect your unique style.
                Quality fashion for every occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <UserButton variant="primary" className="px-8 py-3 text-lg">
                    Shop New Arrivals
                  </UserButton>
                </Link>
                <Link to="/products">
                  <UserButton variant="secondary" className="px-8 py-3 text-lg">
                    View Collection
                  </UserButton>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-accent-secondary rounded-full absolute -top-4 -left-4 opacity-20"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-accent-error rounded-full absolute -bottom-4 -right-4 opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden border-8 border-bg-secondary dark:border-bg-secondary shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                    alt="Fashion Model"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Shop by Category</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover the perfect pieces for every occasion in our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-hover-text">{category.name}</h3>
                  <p className="text-text-secondary mt-2">{category.count} items</p>
                  <Link to="/products" className="inline-block mt-4">
                    <UserButton
                      variant="secondary"
                    >
                      Explore
                    </UserButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-bg-secondary dark:bg-card-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Featured Collections</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Handpicked items for your wardrobe that define your personal style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border-color"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent-error text-hover-text px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-accent-primary font-bold text-lg">{product.price}</span>
                    <Link to={`/products/${product.id}`}>
                      <UserButton
                        variant="primary"
                      >
                        View Details
                      </UserButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <UserButton
                variant="secondary"
              >
                View All Products
              </UserButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 bg-gradient-to-r from-accent-primary to-accent-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hover-text mb-4">Summer Sale is Live!</h2>
          <p className="text-xl text-text-secondary/80 mb-8 max-w-2xl mx-auto">
            Enjoy up to 50% off on selected items. Limited time offer - don't miss out!
          </p>
          <Link to="/products">
            <UserButton
              variant="danger"
              className="px-8 py-3 text-lg"
            >
              Shop the Sale
            </UserButton>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">What Our Customers Say</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Hear from our satisfied customers about their shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-card-bg p-6 rounded-xl shadow-md border border-border-color"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-error" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary mb-4">
                  "The quality of the clothes exceeded my expectations. Fast shipping and great customer service. Will definitely shop here again!"
                </p>
                <div className="flex items-center">
                  <div className="bg-border-color rounded-full w-10 h-10 mr-3"></div>
                  <div>
                    <p className="font-medium text-text-primary">Customer {item}</p>
                    <p className="text-sm text-text-secondary">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;