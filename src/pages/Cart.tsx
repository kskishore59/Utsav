import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { Trash2, Calendar } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart } = useStore();
  
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity * item.rentalDays), 0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="p-6">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.rentalDays} day{item.rentalDays > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-lg font-medium text-gray-900">
                    ${item.price * item.quantity * item.rentalDays}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 flex items-center text-sm text-red-600 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="mt-4">
            <Link
              to="/checkout"
              className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-md hover:bg-indigo-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}