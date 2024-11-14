import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Calendar } from 'lucide-react';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity * item.rentalDays), 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.rentalDays} day{item.rentalDays > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price * item.quantity * item.rentalDays}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 px-4 py-3">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Details</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                id="address"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Complete Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}