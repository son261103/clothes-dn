import React from 'react';
import UserButton from '../../components/user/UserButton';

const CartPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-cardBg rounded-lg shadow overflow-hidden border borderColor">
            <table className="min-w-full divide-y borderColor">
              <thead className="bg-bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y borderColor">
                {[1, 2].map((item) => (
                  <tr key={item}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-bg-secondary border-2 border-dashed border-borderColor rounded-xl w-16 h-16" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">Product {item}</div>
                          <div className="text-sm text-text-secondary">Size: M, Color: Blue</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      $49.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button className="px-2 py-1 border borderColor rounded bg-bg-secondary">-</button>
                        <span className="mx-2 w-10 text-center text-text-primary">1</span>
                        <button className="px-2 py-1 border borderColor rounded bg-bg-secondary">+</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      $49.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-accentPrimary hover:text-accentSecondary">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-cardBg p-6 rounded-lg shadow border borderColor">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text-primary">$99.98</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="font-medium text-text-primary">$5.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax</span>
                <span className="font-medium text-text-primary">$8.25</span>
              </div>
              <div className="border-t borderColor pt-3 mt-3 flex justify-between font-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">$114.22</span>
              </div>
            </div>

            <UserButton variant="primary" className="w-full mb-3">Proceed to Checkout</UserButton>
            <UserButton variant="secondary" className="w-full">Continue Shopping</UserButton>
          </div>

          <div className="mt-6 bg-cardBg p-6 rounded-lg shadow border borderColor">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">Have a Promo Code?</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 border borderColor rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accentPrimary focus:border-transparent bg-bg-secondary text-text-primary"
              />
              <UserButton variant="secondary" className="rounded-l-none">Apply</UserButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;