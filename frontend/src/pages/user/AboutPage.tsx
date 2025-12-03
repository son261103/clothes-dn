import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/5 rounded-full blur-[100px] -z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-text-main mb-8 leading-tight"
          >
            Chúng Tôi Là <br/>
            <span className="text-brand-orange">ClothesDN</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-sub leading-relaxed"
          >
            Không chỉ là thời trang, chúng tôi tạo ra phong cách sống. 
            Nơi mỗi bộ trang phục kể lên câu chuyện riêng của bạn.
          </motion.p>
        </div>

        {/* STORY SECTION - Split Layout */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
          <div className="md:w-1/2" data-aos="fade-right">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange rounded-[3rem] rotate-3 opacity-20 scale-105"></div>
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" 
                alt="Team working" 
                className="relative rounded-[3rem] shadow-2xl w-full object-cover h-[500px]"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-10 -right-10 glass p-6 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-xl max-w-xs hidden md:block animate-bounce-slow">
                <p className="font-serif italic text-lg text-text-main">"Sáng tạo là không giới hạn, phong cách là vĩnh cửu."</p>
                <p className="text-sm text-brand-orange font-bold mt-2">- CEO Founder</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2" data-aos="fade-left">
            <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block">Câu chuyện của chúng tôi</span>
            <h2 className="text-4xl font-bold text-text-main mb-6">Từ Đam Mê Nhỏ Bé <br/> Đến Thương Hiệu Toàn Cầu</h2>
            <div className="space-y-4 text-text-sub text-lg leading-relaxed">
              <p>
                Bắt đầu từ một cửa hàng nhỏ vào năm 2015, ClothesDN được hình thành từ niềm đam mê mãnh liệt với cái đẹp và sự hoàn hảo trong từng đường kim mũi chỉ.
              </p>
              <p>
                Chúng tôi tin rằng thời trang không nên chỉ đẹp mà còn phải thoải mái và bền vững. Mỗi sản phẩm của chúng tôi đều được tuyển chọn kỹ lưỡng từ chất liệu đến thiết kế, đảm bảo mang lại trải nghiệm tốt nhất cho khách hàng.
              </p>
              <p>
                Hôm nay, ClothesDN tự hào là điểm đến tin cậy của hàng ngàn khách hàng yêu thích sự tinh tế và hiện đại.
              </p>
            </div>
          </div>
        </div>

        {/* STATS SECTION - Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { number: "10+", label: "Năm Kinh Nghiệm" },
            { number: "50k+", label: "Khách Hàng Hài Lòng" },
            { number: "100+", label: "Bộ Sưu Tập" },
            { number: "24/7", label: "Hỗ Trợ Tận Tâm" }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="glass p-8 rounded-3xl text-center border border-white/20 hover:border-brand-orange/30 transition-colors group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <h3 className="text-4xl md:text-5xl font-black text-text-main mb-2 group-hover:text-brand-orange transition-colors">{stat.number}</h3>
              <p className="text-text-sub font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* VALUES SECTION */}
        <div className="text-center mb-32">
           <h2 className="text-3xl font-bold mb-16" data-aos="fade-up">Giá Trị Cốt Lõi</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { icon: "✨", title: "Chất Lượng", desc: "Không bao giờ thỏa hiệp về chất lượng. Tốt nhất hoặc không gì cả." },
               { icon: "🌿", title: "Bền Vững", desc: "Cam kết sử dụng vật liệu thân thiện với môi trường và quy trình sản xuất xanh." },
               { icon: "💡", title: "Sáng Tạo", desc: "Luôn đổi mới, luôn dẫn đầu xu hướng để mang lại sự khác biệt cho bạn." }
             ].map((item, idx) => (
               <div key={idx} className="relative group" data-aos="fade-up" data-aos-delay={idx * 100}>
                 <div className="absolute inset-0 bg-brand-orange/5 rounded-[2.5rem] transform rotate-3 transition-transform group-hover:rotate-6"></div>
                 <div className="glass relative p-10 rounded-[2.5rem] bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-white/30 hover:-translate-y-2 transition-transform duration-300">
                   <div className="text-6xl mb-6">{item.icon}</div>
                   <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                   <p className="text-text-sub">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center py-20 border-t border-brand-dark/5 dark:border-white/5">
          <h2 className="text-4xl font-bold mb-6">Sẵn Sàng Thay Đổi Phong Cách?</h2>
          <p className="text-text-sub mb-8 max-w-xl mx-auto">Khám phá bộ sưu tập mới nhất của chúng tôi và tìm ra phiên bản hoàn hảo nhất của chính bạn.</p>
          <Link to="/products">
            <UserButton variant="primary" size="lg" className="rounded-full px-12 shadow-2xl shadow-brand-orange/30">
              Mua Sắm Ngay
            </UserButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
