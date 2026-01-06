import React from 'react';
import { Link } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';
import ProductCard from '../../components/user/ProductCard';

const HomePage: React.FC = () => {
  // Sử dụng ảnh Fashion chất lượng cao từ Unsplash
  const categories = [
    { id: 1, name: "Nữ", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "Nam", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Trẻ em", img: "https://images.unsplash.com/photo-1503944583220-79d703919998?auto=format&fit=crop&q=80&w=600" },
  ];

  const products = [
    { id: 1, name: "Áo Sơ Mi Linen Cổ Điển", price: 1150000, category: "Nam", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600", isNew: true },
    { id: 2, name: "Quần Cargo Phong Cách", price: 1700000, category: "Nam", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Váy Mùa Hè Thoáng Mát", price: 1350000, category: "Nữ", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600", discount: 15 },
    { id: 4, name: "Áo Hoodie Cơ Bản", price: 2000000, category: "Unisex", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-xs tracking-widest uppercase mb-6 border border-brand-orange/20">
                Mùa Mới 2025
              </span>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight text-text-main">
                Tự Tin <br />
                <span className="text-brand-orange relative inline-block">
                  Khoác Lên Phong Cách
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-beige dark:text-brand-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-text-sub mb-8 max-w-md mx-auto lg:mx-0">
                Khám phá những xu hướng thời trang mới nhất kết hợp giữa sự thoải mái và phong cách.
                Nâng tầm tủ đồ của bạn với bộ sưu tập độc quyền của chúng tôi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <UserButton variant="primary" size="lg" className="rounded-full shadow-xl shadow-brand-orange/20">Mua Ngay</UserButton>
                <UserButton variant="outline" size="lg" className="rounded-full">Khám Phá</UserButton>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-main bg-gray-300 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium">
                  <span className="text-brand-orange font-bold">500+</span> Khách Hàng Hài Lòng
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left" data-aos-delay="200">
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 border-4 border-white/30 dark:border-white/10 glass">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                  alt="Thời Trang Nữ"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-6 right-6 glass-card p-4 rounded-xl max-w-xs animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">%</div>
                    <div>
                      <p className="font-bold text-sm text-white">Sale Hè</p>
                      <p className="text-xs text-white/80">Giảm tới 50%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-beige rounded-full blur-2xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/30 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-bg-sub">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Mua Theo Danh Mục</h2>
            <p className="text-text-sub">Tìm kiếm phong cách phù hợp nhất với bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="glass p-4 rounded-xl backdrop-blur-md border-white/20 flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <span className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-bg-main">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12" data-aos="fade-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-text-main">Xu Hướng Hiện Nay</h2>
              <p className="text-text-sub">Được tuyển chọn dành riêng cho bạn</p>
            </div>
            <Link to="/products" className="text-brand-orange font-medium hover:underline">Xem Tất Cả →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER BANNER - Đã thiết kế lại phần Input */}
      <section className="py-20 container mx-auto px-4 mb-10">
        <div
          className="relative rounded-[2.5rem] overflow-hidden bg-brand-orange text-white p-8 md:p-20 text-center shadow-2xl shadow-brand-orange/30"
          data-aos="zoom-in"
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6 drop-shadow-md">Tham Gia Cùng Chúng Tôi</h2>
            <p className="text-white/90 mb-10 text-lg leading-relaxed">
              Đăng ký nhận bản tin để nhận ngay ưu đãi giảm giá 10% cho đơn hàng đầu tiên và cập nhật những bộ sưu tập mới nhất.
            </p>

            {/* INPUT FORM MỚI */}
            <div className="bg-bg-main p-2 rounded-full shadow-2xl max-w-lg mx-auto flex flex-col sm:flex-row gap-2 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex-1 flex items-center px-4 relative">
                {/* Icon Email */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-sub mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="w-full h-12 bg-transparent text-text-main placeholder-text-sub/60 font-medium focus:outline-none text-base"
                />
              </div>
              <button className="bg-brand-dark dark:bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-black dark:hover:bg-brand-orange/80 transition-all shadow-lg shrink-0 text-base">
                Đăng Ký
              </button>
            </div>
            <p className="text-white/60 text-xs mt-4 font-medium">Chúng tôi cam kết bảo mật thông tin của bạn. Không spam.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
