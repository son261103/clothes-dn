import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại ClothesDN.");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
           <h1 className="text-4xl font-black text-text-main mb-10 text-center">Thanh Toán</h1>

           <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
              
              {/* LEFT: SHIPPING INFO */}
              <div className="lg:w-2/3 space-y-8">
                 <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm">1</div>
                       Thông tin giao hàng
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">Họ và tên</label>
                          <input type="text" required placeholder="Nguyễn Văn A" className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">Số điện thoại</label>
                          <input type="tel" required placeholder="0987 654 321" className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold ml-1">Email</label>
                          <input type="email" required placeholder="email@example.com" className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold ml-1">Địa chỉ nhận hàng</label>
                          <input type="text" required placeholder="Số nhà, tên đường, phường/xã..." className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">Tỉnh / Thành phố</label>
                          <select className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange outline-none appearance-none">
                             <option>Hà Nội</option>
                             <option>TP. Hồ Chí Minh</option>
                             <option>Đà Nẵng</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">Quận / Huyện</label>
                          <select className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange outline-none appearance-none">
                             <option>Chọn Quận/Huyện</option>
                          </select>
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold ml-1">Ghi chú (tùy chọn)</label>
                          <textarea rows={3} placeholder="Lưu ý cho người giao hàng..." className="w-full px-5 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-brand-dark/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none"></textarea>
                       </div>
                    </div>
                 </div>
              </div>

              {/* RIGHT: PAYMENT & SUMMARY */}
              <div className="lg:w-1/3 space-y-8">
                 {/* Payment Method */}
                 <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm">2</div>
                       Thanh toán
                    </h3>

                    <div className="space-y-4">
                       <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-brand-orange bg-brand-orange/5' : 'border-brand-dark/10 hover:border-brand-orange/50'}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            value="cod" 
                            checked={paymentMethod === 'cod'} 
                            onChange={() => setPaymentMethod('cod')}
                            className="w-5 h-5 text-brand-orange accent-brand-orange" 
                          />
                          <span className="font-bold flex-1">Thanh toán khi nhận hàng (COD)</span>
                          <svg className="w-6 h-6 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                       </label>

                       <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-brand-orange bg-brand-orange/5' : 'border-brand-dark/10 hover:border-brand-orange/50'}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            value="banking" 
                            checked={paymentMethod === 'banking'} 
                            onChange={() => setPaymentMethod('banking')}
                            className="w-5 h-5 text-brand-orange accent-brand-orange" 
                          />
                          <span className="font-bold flex-1">Chuyển khoản ngân hàng</span>
                          <svg className="w-6 h-6 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                       </label>
                    </div>
                 </div>

                 {/* Summary */}
                 <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                    <h3 className="text-xl font-bold mb-6">Đơn hàng (2 món)</h3>
                    
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                       <div className="flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                             <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1">
                             <p className="font-bold text-sm line-clamp-1">Áo Sơ Mi Linen Cổ Điển</p>
                             <p className="text-xs text-text-sub">Size: M • x1</p>
                             <p className="font-bold text-sm text-brand-orange">1.150.000₫</p>
                          </div>
                       </div>
                       <div className="flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                             <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1">
                             <p className="font-bold text-sm line-clamp-1">Quần Cargo Phong Cách</p>
                             <p className="text-xs text-text-sub">Size: 32 • x1</p>
                             <p className="font-bold text-sm text-brand-orange">1.700.000₫</p>
                          </div>
                       </div>
                    </div>

                    <div className="border-t border-brand-dark/10 pt-4 space-y-2">
                       <div className="flex justify-between text-sm">
                          <span>Tạm tính</span>
                          <span className="font-bold">2.850.000₫</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span>Vận chuyển</span>
                          <span className="font-bold">30.000₫</span>
                       </div>
                       <div className="flex justify-between text-lg font-black pt-2 text-brand-orange">
                          <span>Tổng cộng</span>
                          <span>2.880.000₫</span>
                       </div>
                    </div>

                    <div className="mt-6">
                       <UserButton type="submit" variant="primary" fullWidth size="lg" className="rounded-xl shadow-xl h-14">
                          Đặt Hàng Ngay
                       </UserButton>
                    </div>
                 </div>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
