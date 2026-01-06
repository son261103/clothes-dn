import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  discount?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Format giá tiền VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <motion.div
      className="group relative bg-bg-sub rounded-3xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-brand-orange/10 transition-all duration-500"
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="glass bg-brand-orange/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
              MỚI
            </span>
          )}
          {product.discount && (
            <span className="glass bg-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 z-20
            ${isFavorite
              ? 'bg-white text-red-500 dark:bg-gray-900/80 dark:text-red-500'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 dark:bg-black/50 dark:text-gray-400 dark:hover:bg-black/70 dark:hover:text-red-400'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isFavorite ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick Actions (Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-3 z-10">

          {/* Nút Thêm vào giỏ */}
          <button className="flex-1 py-3 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-300
             bg-white text-brand-orange
             dark:bg-gray-900/90 dark:text-white
             hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange
             border border-white/20 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Thêm vào giỏ
          </button>

          {/* Nút Xem chi tiết */}
          <Link to={`/products/${product.id}`} className="w-12 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300
             bg-white text-brand-orange
             dark:bg-gray-900/90 dark:text-white
             hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange
             border border-white/20 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>

        {/* Gradient Overlay khi hover để text dễ đọc hơn nếu cần */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-xs text-text-sub mb-1.5 uppercase tracking-wider font-semibold opacity-70">{product.category}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-text-main mb-2 hover:text-brand-orange transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-brand-orange font-extrabold text-lg">
                {product.discount
                  ? formatPrice(product.price * (100 - product.discount) / 100)
                  : formatPrice(product.price)
                }
              </span>
              {product.discount && (
                <span className="text-text-sub text-xs line-through opacity-50">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
          <div className="flex text-yellow-400 text-xs gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;