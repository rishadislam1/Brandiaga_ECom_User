import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MapPin, CreditCard, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

// Mock API key (replace with secure server-side handling in production)
const API_KEY = "9gRgWDddrfz1C6DwQsOPo9FpomBw9VWKclVSHHZg222fe955";
const BASE_URL = "https://sandbox.api.mastercard.com/community-pass/payments";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartItems = [],
    subtotal = 0,
    shipping = 15.0,
    tax = 0,
    total = subtotal + shipping + tax,
    deliveryOption = "standard",
  } = location.state || {};

  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phoneNumber: "",
  });

  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Validate customer details using the Validations API
  const validateCustomer = async () => {
    try {
      const response = await fetch(`${BASE_URL}/validations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          appId: "MFN",
          partnerId: "12345",
          accountId: addressFormData.phoneNumber,
          partnerType: "MERCHANT",
          correlationId: crypto.randomUUID(),
          transactionTime: new Date().toISOString(),
          paymentChannel: "WEB",
        }),
      });

      if (!response.ok) {
        throw new Error(`Validation failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.accountId) {
        throw new Error("Invalid customer details");
      }
      return data; // e.g., { accountId, accountName, additionalInfo }
    } catch (error) {
      throw new Error(error.message || "Customer validation failed");
    }
  };

  // Notify payment status using the Callbacks API
  const notifyPaymentStatus = async (transactionReference, status) => {
    try {
      const response = await fetch(`${BASE_URL}/callbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          appId: "MFN",
          partnerAccountId: "12345678",
          transactionReference,
          providerReference: `pro-${Date.now()}`,
          status,
          confirmationUrl: "https://your-site.com/confirmation",
          responseCode: status === "SUCCESS" ? "100" : "500",
          responseMessage: status === "SUCCESS" ? "Successful" : "Failed",
          correlationId: crypto.randomUUID(),
          apiAction: "B2C",
          recipients: [
            {
              clientId: "88784744",
              transactionId: `txn-${Date.now()}`,
              accountName: addressFormData.fullName,
              accountNumber: addressFormData.phoneNumber,
              transactionAmount: total,
              currency: "USD",
              countryCode: addressFormData.country === "United States" ? "US" : addressFormData.country === "Canada" ? "CA" : "GB",
              responseCode: status === "SUCCESS" ? "100" : "500",
              responseMessage: status === "SUCCESS" ? "Successful" : "Failed",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Callback failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Payment status notification failed");
    }
  };

  // Validate card details (basic client-side validation)
  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = paymentFormData;
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ""))) {
      return "Invalid card number (must be 16 digits)";
    }
    if (!expiryRegex.test(expiryDate)) {
      return "Invalid expiry date (MM/YY)";
    }
    const [month, year] = expiryDate.split("/");
    const expiry = new Date(`20${year}`, month - 1);
    if (expiry < new Date()) {
      return "Card expired";
    }
    if (!cvvRegex.test(cvv)) {
      return "Invalid CVV (must be 3 digits)";
    }
    if (!cardholderName.trim()) {
      return "Cardholder name is required";
    }
    return null;
  };

  // Simulate payment processing (replace with actual payment provider)
  const processPayment = async () => {
    // In production, send card details to a secure backend or payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          result: "SUCCESS",
          transactionId: `DEMO_TXN_${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 1000);
    });
  };

  const handleDeliveryOptionChange = (option, shippingCost) => {
    const newTotal = subtotal + shippingCost + tax;
    navigate(location.pathname, {
      state: { ...location.state, deliveryOption: option, shipping: shippingCost, total: newTotal },
    });
  };

  const handleAddressChange = (e) => {
    setAddressFormData({ ...addressFormData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") {
      // Format card number (e.g., 1234 5678 9012 3456)
      value = value
          .replace(/\s/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim()
          .slice(0, 19);
    } else if (name === "expiryDate") {
      // Remove all non-digit characters
      value = value.replace(/\D/g, "");

      if (value.length >= 3) {
        let month = value.slice(0, 2);
        let year = value.slice(2, 4);

        // Prevent invalid months
        if (parseInt(month, 10) > 12) {
          month = "12";
        }

        value = `${month}/${year}`;
      }

      // Limit to 5 characters max (MM/YY)
      value = value.slice(0, 5);
    }
    else if (name === "cvv") {
      // Limit CVV to 3 digits
      value = value.replace(/[^0-9]/g, "").slice(0, 3);
    }
    setPaymentFormData({ ...paymentFormData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (
        !addressFormData.fullName ||
        !addressFormData.streetAddress ||
        !addressFormData.city ||
        !addressFormData.state ||
        !addressFormData.zipCode ||
        !addressFormData.phoneNumber
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required address fields",
        variant: "destructive",
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessingOrder(true);
    try {
      // Step 1: Validate card details
      const cardError = validateCardDetails();
      if (cardError) {
        throw new Error(cardError);
      }

      // Step 2: Validate customer
      await validateCustomer();

      // Step 3: Process payment (simulated)
      const paymentResult = await processPayment();
      if (paymentResult.result !== "SUCCESS") {
        throw new Error("Payment processing failed");
      }

      // Step 4: Notify Mastercard of payment status
      await notifyPaymentStatus(paymentResult.transactionId, "SUCCESS");

      toast({
        title: "Order Placed!",
        description: "Your order has been confirmed",
        variant: "default",
      });
      navigate("/orders");
      setShowPaymentModal(false);
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message || "Unable to process payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
          <Link to="/cart">
            <Button variant="outline" size="sm">Return to Cart</Button>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-900 mr-2">
                  <span className="text-xs font-bold">1</span>
                </div>
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={addressFormData.fullName}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">Street Address</label>
                    <Input
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        placeholder="Street Address"
                        value={addressFormData.streetAddress}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
                    <Input
                        id="apartment"
                        name="apartment"
                        type="text"
                        placeholder="Apartment, suite, etc."
                        value={addressFormData.apartment}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={addressFormData.city}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                    <Input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={addressFormData.state}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
                    <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder="ZIP Code"
                        value={addressFormData.zipCode}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                    <select
                        id="country"
                        name="country"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={addressFormData.country}
                        onChange={handleAddressChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        value={addressFormData.phoneNumber}
                        onChange={handleAddressChange}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-start gap-2">
                    <Checkbox id="saveAddress" />
                    <label htmlFor="saveAddress" className="text-sm text-gray-600">Save this information for next time</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-900 mr-2">
                  <span className="text-xs font-bold">2</span>
                </div>
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              <Tabs defaultValue="creditCard" value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-1 mb-6">
                  <TabsTrigger value="creditCard" className="text-sm">Mastercard Payment</TabsTrigger>
                </TabsList>
                <TabsContent value="creditCard" className="space-y-4">
                  <p className="text-sm text-gray-600">Enter your card details securely in the next step.</p>
                  <div className="flex items-start gap-2">
                    <Checkbox id="savePaymentInfo" checked={savePaymentInfo} onCheckedChange={setSavePaymentInfo} />
                    <label htmlFor="savePaymentInfo" className="text-sm text-gray-600">Save this payment method for future purchases</label>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-8 bg-gray-50 p-4 rounded-md border">
                <div className="flex items-center mb-2">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Your payment is secure</span>
                </div>
                <p className="text-xs text-gray-600">Processed securely with Mastercard.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-900 mr-2">
                  <span className="text-xs font-bold">3</span>
                </div>
                <h2 className="text-xl font-semibold">Delivery Options</h2>
              </div>
              <div className="space-y-3">
                <div className="border p-4 rounded-md flex items-center hover:border-yellow-400 cursor-pointer">
                  <Checkbox
                      id="standard"
                      checked={deliveryOption === "standard"}
                      className="mr-3"
                      onCheckedChange={() => handleDeliveryOptionChange("standard", 15.0)}
                  />
                  <div className="flex-1">
                    <label htmlFor="standard" className="block font-medium cursor-pointer">Standard Delivery</label>
                    <p className="text-sm text-gray-600">Estimated delivery: Jun 19 - Jun 22, 2025</p>
                  </div>
                  <span className="font-medium">$15.00</span>
                </div>
                <div className="border p-4 rounded-md flex items-center hover:border-yellow-400 cursor-pointer">
                  <Checkbox
                      id="express"
                      checked={deliveryOption === "express"}
                      className="mr-3"
                      onCheckedChange={() => handleDeliveryOptionChange("express", 25.0)}
                  />
                  <div className="flex-1">
                    <label htmlFor="express" className="block font-medium cursor-pointer">Express Delivery</label>
                    <p className="text-sm text-gray-600">Estimated delivery: Jun 17 - Jun 18, 2025</p>
                  </div>
                  <span className="font-medium">$25.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="max-h-80 overflow-y-auto mb-4 pr-2">
                {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.color}`} className="flex py-4 border-b">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm line-clamp-2">{item.name}</h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        <div className="flex flex-1 items-end justify-between">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
              <div className="space-y-2 py-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                  className="w-full py-6 mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-base"
                  onClick={handlePlaceOrder}
                  disabled={isProcessingOrder}
              >
                {isProcessingOrder ? "Processing..." : "Place Order"}
              </Button>
              <div className="mt-4 text-xs text-center text-gray-500">
                By placing your order, you agree to our
                <Link to="/terms" className="text-yellow-600 hover:underline"> Terms of Service</Link> and
                <Link to="/privacy" className="text-yellow-600 hover:underline"> Privacy Policy</Link>.
              </div>
            </div>
          </div>
        </div>
        {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Payment Details</h2>
                  <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={isProcessingOrder}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                      <Input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentFormData.cardNumber}
                          onChange={handlePaymentChange}
                          maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
                        <Input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            placeholder="MM/YY"
                            value={paymentFormData.expiryDate}
                            onChange={handlePaymentChange}
                            maxLength={5}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                        <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            placeholder="123"
                            value={paymentFormData.cvv}
                            onChange={handlePaymentChange}
                            maxLength={3}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <Input
                          id="cardholderName"
                          name="cardholderName"
                          type="text"
                          placeholder="John Doe"
                          value={paymentFormData.cardholderName}
                          onChange={handlePaymentChange}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total: ${total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Customer: {addressFormData.fullName} ({addressFormData.phoneNumber})</p>
                    </div>
                  </div>
                  <Button
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      type="submit"
                      disabled={isProcessingOrder}
                  >
                    {isProcessingOrder ? "Processing..." : "Pay Now"}
                  </Button>
                  {isProcessingOrder && (
                      <div className="text-center mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Processing payment...</p>
                      </div>
                  )}
                </form>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Test card: <span className="font-mono">5555 5555 5555 4444</span></p>
                  <p>Use any future expiry date and 3-digit CVV</p>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Checkout;