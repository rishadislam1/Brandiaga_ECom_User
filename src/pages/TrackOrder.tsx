import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader, Truck, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  GetOrderTracking,
  OrderTrackingResponse,
} from "@/Request/TrackingRequest";

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [trackingData, setTrackingData] =
    useState<OrderTrackingResponse | null>(null);
  const [formError, setFormError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!orderNumber.trim() || !email.trim()) {
      setFormError("Please enter both order number and email address.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSearching(true);

    try {
      const data = await GetOrderTracking(orderNumber, email);
      setTrackingData(data.data);
      setFormError("");
    } catch (error: any) {
      setTrackingData(null);
      toast({
        title: "Order not found",
        description:
          error.message ||
          "We couldn’t find an order with that number and email combination. Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your order number and email address to check the status of your
          order.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium mb-1">
                  Order Number
                </label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., B-12345678"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email used for order"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {formError && (
              <div className="bg-red-50 text-red-700 p-3 mb-4 rounded-md text-sm">
                {formError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSearching}
              className="w-full bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900">
              {isSearching ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                "Track Order"
              )}
            </Button>
          </form>
        </div>

        {trackingData && (
          <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{trackingData.orderNumber}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">{trackingData.status}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Estimated Delivery:</div>
                <div className="font-medium">
                  {trackingData.estimatedDelivery || "N/A"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Shipping Address</h3>
                    <p className="text-gray-600 text-sm">
                      {trackingData.shippingAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Carrier Information</h3>
                    <p className="text-gray-600 text-sm">
                      {trackingData.carrier} - Tracking #:{" "}
                      {trackingData.trackingNumber || "N/A"}
                    </p>
                    <a
                      href="#"
                      className="text-brandiaga-yellow-600 text-sm hover:underline inline-flex items-center mt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "External tracking",
                          description:
                            "This would open the carrier’s tracking page in a real app.",
                        });
                      }}>
                      View on carrier site →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold mb-3">Items in this shipment</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 text-sm font-medium">
                      Item
                    </th>
                    <th className="text-center px-4 py-2 text-sm font-medium">
                      Quantity
                    </th>
                    <th className="text-center px-4 py-2 text-sm font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trackingData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold mb-3">Tracking History</h3>
            <div className="relative pl-8 pb-1">
              {trackingData.trackingHistory.map((event, index) => (
                <div key={index} className="relative mb-6 last:mb-0">
                  {index < trackingData.trackingHistory.length - 1 && (
                    <div className="absolute left-2.5 top-3 w-0.5 h-full -ml-px bg-gray-300"></div>
                  )}
                  <div
                    className={`absolute left-0 top-1.5 w-5 h-5 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-green-500" : "bg-gray-300"
                    }`}>
                    {index === 0 && (
                      <CheckCircle className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="pl-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{event.status}</h4>
                      {index === 0 && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {event.date}, {event.time}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="flex justify-between flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-brandiaga-yellow-400 text-brandiaga-yellow-600 hover:bg-brandiaga-yellow-50"
                onClick={() => {
                  toast({
                    title: "Email sent",
                    description:
                      "A copy of your tracking information has been sent to your email.",
                  });
                }}>
                Email Tracking Information
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setTrackingData(null);
                  setOrderNumber("");
                  setEmail("");
                }}>
                Track Another Order
              </Button>
            </div>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Contact Customer Service</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our team is available to assist you with any questions about
                your order.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => (window.location.href = "/contact-us")}>
                Contact Us
              </Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Returns & Exchanges</h3>
              <p className="text-sm text-gray-600 mb-3">
                Need to return or exchange an item from your order?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => (window.location.href = "/faq")}>
                View Return Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
