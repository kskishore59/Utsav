import React from 'react';
import { Calendar, Package, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import type { Order } from '../types';

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'order-1',
    items: [
      {
        id: 'sound-1',
        name: 'Professional PA System',
        category: 'sound',
        price: 200,
        image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80',
        description: 'Complete PA system suitable for medium to large venues',
        available: true,
        quantity: 1,
        rentalDays: 3
      }
    ],
    total: 600,
    status: 'active',
    startDate: '2024-03-15',
    endDate: '2024-03-18'
  }
];

function getStatusIcon(status: Order['status']) {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'active':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'returned':
      return <RefreshCw className="h-5 w-5 text-blue-500" />;
  }
}

function getStatusText(status: Order['status']) {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'active':
      return 'Active Rental';
    case 'returned':
      return 'Returned';
  }
}

export default function Orders() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      {SAMPLE_ORDERS.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {SAMPLE_ORDERS.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium text-gray-900">
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Order #{order.id}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.quantity} x ${item.price} x {item.rentalDays} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="font-medium text-gray-900">
                    Total: ${order.total}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}