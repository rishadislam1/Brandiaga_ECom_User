
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  Truck, 
  Calendar,
  FileText,
  ArrowDown,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-12345",
    date: "April 15, 2025",
    status: "Delivered",
    total: 129.99,
    items: [
      { id: 1, name: "Wireless Headphones", price: 89.99, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
      { id: 2, name: "USB-C Cable", price: 19.99, quantity: 2, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" }
    ],
    address: "123 Main St, Anytown, US 12345",
    tracking: "1ZA4562X0123456789",
    deliveryDate: "April 12, 2025"
  },
  {
    id: "ORD-67890",
    date: "April 10, 2025",
    status: "Shipped",
    total: 45.98,
    items: [
      { id: 3, name: "Smart Water Bottle", price: 45.98, quantity: 1, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8" }
    ],
    address: "123 Main St, Anytown, US 12345",
    tracking: "1ZA4562X9876543210",
    deliveryDate: "April 25, 2025"
  },
  {
    id: "ORD-54321",
    date: "March 28, 2025",
    status: "Processing",
    total: 599.99,
    items: [
      { id: 4, name: "Smartphone", price: 599.99, quantity: 1, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9" }
    ],
    address: "123 Main St, Anytown, US 12345",
    tracking: null,
    deliveryDate: "April 30, 2025"
  }
];

// Mock data for returns
const mockReturns = [
  {
    id: "RET-12345",
    orderId: "ORD-12345",
    date: "April 16, 2025",
    status: "Return Approved",
    items: [
      { id: 2, name: "USB-C Cable", price: 19.99, quantity: 1, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90", reason: "Defective product" }
    ],
    refundAmount: 19.99,
    refundStatus: "Pending"
  }
];

const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleOrder = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Your Orders & Returns</h1>
        <Link to="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="orders" className="text-lg">Orders</TabsTrigger>
          <TabsTrigger value="returns" className="text-lg">Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Filter Orders</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button variant="outline" size="sm">Last 30 days</Button>
                <Button variant="outline" size="sm">Last 3 months</Button>
                <Button variant="outline" size="sm">2024</Button>
                <Button variant="outline" size="sm">Archived orders</Button>
              </div>
            </div>
            
            <input
              type="text"
              placeholder="Search all orders"
              className="w-full p-2 border rounded-md mb-4"
            />
          </div>
          
          {mockOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="mb-4 text-gray-600">You haven't placed any orders yet.</p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between gap-4 cursor-pointer" onClick={() => toggleOrder(order.id)}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">ORDER #:</span>
                        <span className="font-medium">{order.id}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Placed on {order.date}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">TOTAL:</span>
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {expandedOrder === order.id ? (
                        <ArrowUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t border-gray-200 animate-fade-in">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Items in this order</h3>
                          <div className="space-y-4">
                            {order.items.map(item => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                  <img src={`${item.image}?w=64&h=64&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                  <div className="text-sm text-gray-600 mt-1">
                                    <span>Qty: {item.quantity}</span>
                                    <span className="ml-3">${item.price.toFixed(2)}</span>
                                  </div>
                                  <div className="mt-2">
                                    {order.status === 'Delivered' && (
                                      <>
                                        <Link to={`/returns/${order.id}?itemId=${item.id}`}>
                                          <Button variant="outline" size="sm" className="mr-2">Return</Button>
                                        </Link>
                                        <Button variant="ghost" size="sm">Buy Again</Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="md:w-1/3">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-3">Shipping Info</h3>
                            <p className="text-sm mb-3">{order.address}</p>
                            
                            {order.tracking ? (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Truck className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm font-medium">Delivery Status</span>
                                </div>
                                <div className="bg-white p-3 rounded-md border mb-3">
                                  <p className="text-sm mb-1">Tracking Number:</p>
                                  <p className="text-xs font-mono bg-gray-50 p-1 rounded">{order.tracking}</p>
                                  <p className="text-sm mt-2">Estimated delivery by:</p>
                                  <p className="text-sm font-medium">{order.deliveryDate}</p>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">Track Package</Button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-600">Tracking information will be available when the order ships.</p>
                            )}
                          </div>
                          
                          <div className="mt-4 flex flex-col space-y-2">
                            <Button variant="outline" size="sm" className="justify-start">
                              <FileText className="h-4 w-4 mr-2" />
                              View Invoice
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <Package className="h-4 w-4 mr-2" />
                              Get help with this order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="returns" className="space-y-6">
          {mockReturns.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No returns found</h3>
              <p className="mb-4 text-gray-600">You haven't made any returns yet.</p>
              <Link to="/orders">
                <Button variant="outline">View Your Orders</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockReturns.map(returnItem => (
                <div key={returnItem.id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">RETURN #:</span>
                        <span className="font-medium">{returnItem.id}</span>
                        <span className="text-sm text-gray-500">for order {returnItem.orderId}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Requested on {returnItem.date}</span>
                      </div>
                      
                      <div className="mt-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                          {returnItem.status}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">REFUND:</span>
                        <span className="font-medium">${returnItem.refundAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}>
                          {returnItem.refundStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h3 className="font-medium mb-2">Return Items</h3>
                  <div className="space-y-4">
                    {returnItem.items.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img src={`${item.image}?w=64&h=64&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{item.name}</h4>
                          <div className="text-sm text-gray-600 mt-1">
                            <span>Qty: {item.quantity}</span>
                            <span className="ml-3">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Reason:</span> {item.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button size="sm" variant="outline">Get Return Status</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
