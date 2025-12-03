import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserButton from '../../components/user/UserButton';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Áo Sơ Mi Linen Cổ Điển", price: 1150000, size: "M", color: "Cam", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=200", quantity: 1 },
    { id: 2, name: "Quần Cargo Phong Cách", price: 1700000, size: "32", color: "Đen", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=200", quantity: 2 }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => items.map(item => {
       if (item.id === id) {
         const newQuantity = Math.max(1, item.quantity + change);
         return { ...item, quantity: newQuantity };
       }
       return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
     return (
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
           <div className="w-32 h-32 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
           </div>
           <h2 className="text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
           <p className="text-text-sub mb-8 max-w-md">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá bộ sưu tập mới nhất của chúng tôi nhé!</p>
           <Link to="/products">
              <UserButton variant="primary" size="lg" className="rounded-full px-10">Tiếp tục mua sắm</UserButton>
           </Link>
        </div>
     );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
       <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-text-main mb-10">Giỏ Hàng ({cartItems.length})</h1>

          <div className="flex flex-col lg:flex-row gap-12">
             {/* LEFT: CART ITEMS */}
             <div className="lg:w-2/3 space-y-6">
                <AnimatePresence>
                   {cartItems.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="glass p-4 sm:p-6 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 flex gap-6 items-center"
                      >
                         <div className="w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         </div>

                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="text-lg sm:text-xl font-bold text-text-main truncate pr-4">{item.name}</h3>
                               <button onClick={() => removeItem(item.id)} className="text-text-sub hover:text-red-500 transition-colors">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            </div>
                            <p className="text-text-sub text-sm mb-4">
                               Size: <span className="font-bold text-text-main">{item.size}</span> • Màu: <span className="font-bold text-text-main">{item.color}</span>
                            </p>
                            
                            <div className="flex justify-between items-end">
                               <div className="flex items-center bg-white/50 dark:bg-white/10 rounded-lg h-10 border border-brand-dark/10">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center hover:text-brand-orange font-bold">-</button>
                                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center hover:text-brand-orange font-bold">+</button>
                               </div>
                               <p className="text-brand-orange font-bold text-lg">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                               </p>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </AnimatePresence>
             </div>

             {/* RIGHT: ORDER SUMMARY */}
             <div className="lg:w-1/3">
                <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 sticky top-24">
                   <h3 className="text-2xl font-bold mb-6">Tóm Tắt Đơn Hàng</h3>
                   
                   <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-text-sub">
                         <span>Tạm tính</span>
                         <span className="font-medium text-text-main">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-text-sub">
                         <span>Phí vận chuyển</span>
                         <span className="font-medium text-text-main">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shipping)}</span>
                      </div>
                      <div className="border-t border-brand-dark/10 dark:border-white/10 pt-4 flex justify-between items-center">
                         <span className="font-bold text-lg">Tổng cộng</span>
                         <span className="font-black text-2xl text-brand-orange">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
                      </div>
                   </div>

                   <Link to="/checkout">
                      <UserButton variant="primary" fullWidth size="lg" className="shadow-xl shadow-brand-orange/20 rounded-xl h-14 text-lg">
                         Tiến Hành Thanh Toán
                      </UserButton>
                   </Link>
                   
                   <div className="mt-6 flex items-center justify-center gap-2 text-text-sub text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <span>Thanh toán an toàn & bảo mật</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CartPage;
