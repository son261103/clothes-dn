import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserButton from '../../components/user/UserButton';

const COLLECTIONS = [
  {
    id: 1,
    title: "Mùa Hè Rực Rỡ",
    subtitle: "Summer 2025",
    desc: "Cảm nhận hơi thở của biển cả và ánh nắng chói chang qua từng thớ vải linen thoáng mát.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000",
    colSpan: "md:col-span-2",
    height: "h-96 md:h-[30rem]"
  },
  {
    id: 2,
    title: "Thanh Lịch Công Sở",
    subtitle: "Office Chic",
    desc: "Nâng tầm phong cách làm việc với những thiết kế tối giản nhưng đầy quyền lực.",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600",
    colSpan: "md:col-span-1",
    height: "h-96 md:h-[30rem]"
  },
  {
    id: 3,
    title: "Đường Phố Bụi Bặm",
    subtitle: "Street Style",
    desc: "Phá vỡ mọi quy tắc với phong cách đường phố đầy ngẫu hứng và cá tính.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=600",
    colSpan: "md:col-span-1",
    height: "h-96 md:h-[25rem]"
  },
  {
    id: 4,
    title: "Tối Giản Hiện Đại",
    subtitle: "Minimalist",
    desc: "Ít hơn là nhiều. Sự tinh tế đến từ những đường cắt may hoàn hảo.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000",
    colSpan: "md:col-span-2",
    height: "h-96 md:h-[25rem]"
  }
];

const CollectionsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 relative">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 mt-10">
          <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block" data-aos="fade-up">Khám phá</span>
          <h1 className="text-5xl md:text-7xl font-black text-text-main mb-6" data-aos="fade-up" data-aos-delay="100">
            Bộ Sưu Tập <br/>
            <span className="italic font-light font-serif">Độc Quyền</span>
          </h1>
          <p className="max-w-2xl mx-auto text-text-sub text-lg" data-aos="fade-up" data-aos-delay="200">
            Mỗi bộ sưu tập là một câu chuyện, một hành trình tìm kiếm vẻ đẹp đích thực. 
            Được thiết kế với niềm đam mê và sự tỉ mỉ trong từng chi tiết.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`group relative rounded-[2.5rem] overflow-hidden ${item.colSpan} ${item.height}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-brand-orange text-white text-xs font-bold uppercase rounded-full mb-4 backdrop-blur-md bg-opacity-90">
                  {item.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic">
                  {item.title}
                </h2>
                <p className="text-white/80 mb-8 max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {item.desc}
                </p>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                  <Link to="/products">
                    <button className="px-8 py-3 rounded-full border border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
                      Xem Chi Tiết
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section (Mini) */}
        <div className="mt-32 relative rounded-[3rem] overflow-hidden p-12 text-center bg-brand-dark text-white" data-aos="zoom-in">
           <div className="relative z-10">
             <h2 className="text-3xl font-bold mb-4">Đừng bỏ lỡ bộ sưu tập mới</h2>
             <p className="text-white/60 mb-8">Đăng ký để nhận thông báo ngay khi chúng tôi ra mắt sản phẩm mới.</p>
             <Link to="/register">
               <UserButton variant="primary" size="lg" className="shadow-brand-orange/30">Đăng Ký Ngay</UserButton>
             </Link>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
