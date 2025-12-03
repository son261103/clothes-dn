import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserButton from '../../components/user/UserButton';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("cam");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Mock Data
  const product = {
    name: "Áo Sơ Mi Linen Cổ Điển",
    price: 1150000,
    description: "Được chế tác từ 100% sợi lanh tự nhiên cao cấp, chiếc áo sơ mi này mang lại cảm giác thoáng mát tuyệt đối cho những ngày hè. Thiết kế form rộng thoải mái (Relaxed fit) kết hợp cùng cổ đức cổ điển tạo nên vẻ ngoài vừa thanh lịch vừa phóng khoáng.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "cam", hex: "#FF6D1F" },
      { name: "trang", hex: "#FFFFFF" },
      { name: "den", hex: "#222222" }
    ],
    sizes: ["S", "M", "L", "XL"]
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="fixed top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/5 rounded-full blur-[100px] -z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-sub mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-orange">Trang chủ</Link> 
          <span>/</span>
          <Link to="/products" className="hover:text-brand-orange">Sản phẩm</Link>
          <span>/</span>
          <span className="text-text-main font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:w-1/2">
             <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 group shadow-2xl">
               <img 
                 src={mainImage} 
                 alt={product.name} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
             </div>
             <div className="flex gap-4 overflow-x-auto pb-2">
               {product.images.map((img, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setMainImage(img)}
                   className={`w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-brand-orange opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                 >
                   <img src={img} alt="" className="w-full h-full object-cover" />
                 </button>
               ))}
             </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:w-1/2">
             <div className="glass p-8 md:p-10 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10">
                <h1 className="text-3xl md:text-4xl font-black text-text-main mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-3xl font-bold text-brand-orange">
                     {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                   </span>
                   <div className="flex items-center gap-1 text-yellow-400 text-sm">
                     ★★★★★ <span className="text-text-sub ml-1">(128 đánh giá)</span>
                   </div>
                </div>

                <p className="text-text-sub text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-sub mb-3">Màu sắc</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === color.name ? 'border-brand-orange scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      >
                         {selectedColor === color.name && (
                           <svg className={`w-5 h-5 ${color.name === 'trang' ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                         )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-sub mb-3">Kích thước</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center transition-all border ${
                          selectedSize === size 
                          ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/30' 
                          : 'bg-white/50 dark:bg-white/5 border-brand-dark/10 dark:border-white/20 text-text-main hover:border-brand-orange hover:text-brand-orange'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                   <div className="flex items-center bg-white/50 dark:bg-white/5 rounded-xl border border-brand-dark/10 dark:border-white/20 h-14 w-fit">
                     <button 
                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
                       className="w-12 h-full flex items-center justify-center text-text-sub hover:text-brand-orange transition-colors text-xl font-bold"
                     >−</button>
                     <span className="w-12 text-center font-bold text-text-main text-lg">{quantity}</span>
                     <button 
                       onClick={() => setQuantity(quantity + 1)}
                       className="w-12 h-full flex items-center justify-center text-text-sub hover:text-brand-orange transition-colors text-xl font-bold"
                     >+</button>
                   </div>
                   <UserButton variant="primary" size="lg" className="flex-1 rounded-xl shadow-xl shadow-brand-orange/20 h-14 text-lg">
                      Thêm Vào Giỏ Hàng
                   </UserButton>
                </div>
             </div>
          </div>
        </div>

        {/* TABS: DESCRIPTION & REVIEWS */}
        <div className="max-w-4xl mx-auto">
           <div className="flex gap-8 border-b border-brand-dark/10 dark:border-white/10 mb-8">
              <button 
                onClick={() => setActiveTab("description")}
                className={`pb-4 text-lg font-bold transition-colors border-b-2 -mb-[2px] ${activeTab === "description" ? 'text-brand-orange border-brand-orange' : 'text-text-sub border-transparent hover:text-text-main'}`}
              >
                Mô tả chi tiết
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-lg font-bold transition-colors border-b-2 -mb-[2px] ${activeTab === "reviews" ? 'text-brand-orange border-brand-orange' : 'text-text-sub border-transparent hover:text-text-main'}`}
              >
                Đánh giá (128)
              </button>
           </div>

           <div className="glass p-8 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-md">
              {activeTab === "description" ? (
                <div className="space-y-4 text-text-sub leading-relaxed">
                  <p>Chiếc áo sơ mi Linen này là sự kết hợp hoàn hảo giữa phong cách cổ điển và sự thoải mái hiện đại. Chất liệu Linen tự nhiên có khả năng thấm hút mồ hôi cực tốt, giúp bạn luôn cảm thấy mát mẻ ngay cả trong những ngày nắng nóng nhất.</p>
                  <p><strong>Đặc điểm nổi bật:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Chất liệu: 100% Linen Premium.</li>
                    <li>Kiểu dáng: Relaxed Fit, phù hợp với mọi dáng người.</li>
                    <li>Màu sắc bền bỉ, không phai màu sau nhiều lần giặt.</li>
                    <li>Sản xuất thủ công tỉ mỉ tại Việt Nam.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-6">
                   {[1, 2].map((review) => (
                     <div key={review} className="border-b border-brand-dark/10 dark:border-white/10 last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between mb-2">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center font-bold text-brand-orange">A</div>
                              <div>
                                 <p className="font-bold text-text-main">Nguyễn Văn A</p>
                                 <p className="text-xs text-text-sub">2 ngày trước</p>
                              </div>
                           </div>
                           <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                        <p className="text-text-sub">Sản phẩm rất đẹp, vải mát và form dáng chuẩn như hình. Giao hàng cũng rất nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop dài dài!</p>
                     </div>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
