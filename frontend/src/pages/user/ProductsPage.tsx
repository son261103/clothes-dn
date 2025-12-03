import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../../components/user/ProductCard';
import UserButton from '../../components/user/UserButton';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data (Dữ liệu giả lập)
const MOCK_PRODUCTS = [
  { id: 1, name: "Áo Sơ Mi Linen Cổ Điển", price: 1150000, category: "Áo Nam", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600", isNew: true },
  { id: 2, name: "Quần Cargo Phong Cách", price: 1700000, category: "Quần Nam", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600", discount: 10 },
  { id: 3, name: "Váy Mùa Hè Thoáng Mát", price: 1350000, category: "Váy Nữ", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Áo Hoodie Cơ Bản", price: 2000000, category: "Áo Khoác", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600", isNew: true },
  { id: 5, name: "Áo Thun Cotton Organic", price: 550000, category: "Áo Thun", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Quần Jean Slim Fit", price: 1200000, category: "Quần Nam", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Áo Blazer Công Sở", price: 2500000, category: "Áo Khoác", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Giày Sneaker Trắng", price: 1850000, category: "Giày Dép", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600" },
];

const CATEGORIES = ["Tất cả", "Áo Nam", "Quần Nam", "Váy Nữ", "Áo Khoác", "Giày Dép", "Phụ Kiện"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest" },
  { label: "Giá: Thấp đến Cao", value: "price_asc" },
  { label: "Giá: Cao đến Thấp", value: "price_desc" },
  { label: "Bán chạy nhất", value: "best_seller" }
];

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange }: { options: any[], value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(opt => opt.value === value)?.label || options[0].label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-64 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl glass bg-white/40 dark:bg-black/30 border border-brand-dark/10 dark:border-white/20 hover:border-brand-orange/50 transition-all text-text-main font-medium backdrop-blur-lg shadow-sm"
      >
        <span>{selectedLabel}</span>
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-main/95 dark:bg-bg-sub/95 backdrop-blur-xl border border-brand-dark/10 dark:border-white/20 rounded-xl shadow-2xl z-[100] overflow-hidden p-1.5"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all font-medium ${
                    value === option.value 
                    ? 'bg-brand-orange text-white shadow-md' 
                    : 'text-text-main hover:bg-brand-orange/10 hover:text-brand-orange hover:pl-5'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState(5000000);
  const [sortBy, setSortBy] = useState("newest");

  // Filter Logic
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (selectedCategory === "Tất cả" || p.category === selectedCategory) &&
    p.price <= priceRange
  );

  return (
    <div className="min-h-screen pt-10 pb-20 relative">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-brand-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-beige/10 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Banner Header */}
      <div className="relative h-64 md:h-80 overflow-hidden mb-10 rounded-b-[3rem] shadow-2xl mx-4 md:mx-0 mt-4 md:mt-0 group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent z-10 flex flex-col justify-center px-8 md:px-20 transition-opacity duration-500">
          <span className="text-brand-orange font-bold tracking-widest uppercase mb-2" data-aos="fade-right">Bộ Sưu Tập Mùa Hè</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg" data-aos="fade-right" data-aos-delay="100">Phong Cách <br/> Đích Thực</h1>
          <p className="text-white/80 max-w-md text-lg" data-aos="fade-right" data-aos-delay="200">Khám phá những thiết kế độc đáo, tôn vinh cá tính của bạn.</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600" 
          alt="Banner" 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]"
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* SIDEBAR (DESKTOP) - GLASSMORPHISM */}
        <div className="hidden lg:block w-1/4">
          <div className="glass p-6 rounded-[2rem] sticky top-24 bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main pb-4 border-b border-brand-dark/5 dark:border-white/10">
              <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              Bộ Lọc
            </h3>
            
            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-bold text-sm text-text-sub uppercase mb-4 tracking-wider">Danh mục</h4>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex justify-between items-center font-medium ${
                        selectedCategory === cat 
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 font-bold' 
                        : 'text-text-main hover:bg-brand-orange/10 hover:text-brand-orange hover:pl-6'
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-bold text-sm text-text-sub uppercase mb-4 tracking-wider">Khoảng giá</h4>
              <input 
                type="range" 
                min="0" 
                max="5000000" 
                step="100000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-brand-dark/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-sm font-medium mt-3 bg-white/30 dark:bg-black/20 p-2 rounded-lg border border-white/10">
                <span className="text-text-sub">0₫</span>
                <span className="text-brand-orange font-bold">{new Intl.NumberFormat('vi-VN').format(priceRange)}₫</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="font-bold text-sm text-text-sub uppercase mb-4 tracking-wider">Kích thước</h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button key={size} className="w-10 h-10 rounded-xl border border-brand-dark/10 dark:border-white/20 bg-white/20 dark:bg-white/5 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md text-text-main">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full lg:w-3/4">
          {/* Toolbar Glassmorphism - Z-Index FIX */}
          <div className="glass mb-8 p-4 rounded-[1.5rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 relative z-40">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                 <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <p className="text-text-sub font-medium">
                Tìm thấy <span className="text-text-main font-bold text-lg">{filteredProducts.length}</span> sản phẩm
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto items-center relative z-50">
               <button 
                 className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-orange text-white rounded-xl shadow-lg font-bold hover:bg-orange-600 transition-colors"
                 onClick={() => setIsFilterOpen(true)}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                 Bộ Lọc
               </button>

               {/* Custom Dropdown */}
               <CustomDropdown 
                 options={SORT_OPTIONS} 
                 value={sortBy} 
                 onChange={setSortBy} 
               />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 relative z-0">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 glass rounded-[2rem] border-dashed border-2 border-text-sub/20 bg-white/20 dark:bg-white/5 backdrop-blur-md">
               <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <h3 className="text-2xl font-bold mb-2 text-text-main">Không tìm thấy sản phẩm nào</h3>
               <p className="text-text-sub">Hãy thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-3">
             <button className="w-12 h-12 rounded-xl glass hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center group bg-white/30 dark:bg-white/5">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button className="w-12 h-12 rounded-xl bg-brand-orange text-white font-bold shadow-lg shadow-brand-orange/30 flex items-center justify-center scale-110">1</button>
             <button className="w-12 h-12 rounded-xl glass hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center bg-white/30 dark:bg-white/5">2</button>
             <button className="w-12 h-12 rounded-xl glass hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center bg-white/30 dark:bg-white/5">3</button>
             <button className="w-12 h-12 rounded-xl glass hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center group bg-white/30 dark:bg-white/5">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER OVERLAY */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85vw] max-w-sm h-full bg-bg-main z-[70] p-6 shadow-2xl overflow-y-auto lg:hidden border-l border-white/10"
            >
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
                  <h3 className="text-2xl font-black text-text-main">Bộ Lọc</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
               </div>

               {/* Mobile Categories */}
               <div className="mb-8">
                  <h4 className="font-bold text-sm text-text-sub uppercase mb-4 tracking-wider">Danh mục</h4>
                  <ul className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <li key={cat}>
                        <button 
                          onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3.5 rounded-xl transition-all ${selectedCategory === cat ? 'bg-brand-orange text-white font-bold shadow-lg' : 'bg-bg-sub text-text-main'}`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Price Range */}
                <div className="mb-8">
                  <h4 className="font-bold text-sm text-text-sub uppercase mb-4 tracking-wider">Khoảng giá</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="5000000" 
                    step="100000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                   <div className="flex justify-between text-sm font-medium mt-3 bg-bg-sub p-3 rounded-xl">
                    <span className="text-text-sub">0₫</span>
                    <span className="text-brand-orange font-bold">{new Intl.NumberFormat('vi-VN').format(priceRange)}₫</span>
                  </div>
                </div>

                 <UserButton fullWidth size="lg" onClick={() => setIsFilterOpen(false)} className="shadow-xl">
                    Áp dụng bộ lọc
                 </UserButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
