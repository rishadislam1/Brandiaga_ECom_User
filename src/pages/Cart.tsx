import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  updateCartItem,
  removeFromCart,
  addToCart,
} from "@/redux/Slicers/CartSlice";
import { RootState } from "@/redux/store";
import { baseURL } from "@/hooks/UseAxiosSecure";

// Define the shape of a cart/saved item
interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
  isPrime?: boolean;
}

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector(
    (state: RootState) => state.products.products || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">(
    "standard",
  );

  // Load saved for later items from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("savedForLater");
      console.log(savedItems);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        // Validate that each item has required fields
        const validItems = parsedItems.filter(
          (item: any) =>
            item.productId &&
            item.name &&
            typeof item.price === "number" &&
            item.image &&
            item.color,
        );
        setSavedForLater(validItems);
      }
    } catch (error) {
      console.error("Error loading savedForLater from localStorage:", error);
      setSavedForLater([]);
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever savedForLater changes
  // useEffect(() => {
  //   try {
  //     localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
  //   } catch (error) {
  //     console.error("Error saving savedForLater to localStorage:", error);
  //   }
  // }, [savedForLater]);

  // Update item quantity in cart
  const updateQuantity = (
    productId: string,
    color: string,
    quantity: number,
  ) => {
    if (quantity < 1) return;

    setIsLoading(true);
    dispatch(updateCartItem({ productId, color, quantity }));
    setTimeout(() => setIsLoading(false), 500);
  };

  // Remove item from cart
  const removeItem = (productId: string, color: string) => {
    setIsLoading(true);
    dispatch(removeFromCart({ productId, color }));
    setTimeout(() => setIsLoading(false), 500);
  };

  // Save item for later
  const saveForLater = (item: CartItem) => {
    setIsLoading(true);
    dispatch(removeFromCart({ productId: item.productId, color: item.color }));
    setSavedForLater((prev) => [...prev, { ...item, quantity: 1 }]);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Move item back to cart
  const moveToCart = (item: CartItem, index: number) => {
    setIsLoading(true);
    dispatch(addToCart({ ...item, quantity: 1 }));
    setSavedForLater((prev) => prev.filter((_, i) => i !== index));
    setTimeout(() => setIsLoading(false), 500);
  };

  // Remove item from saved for later
  const removeSavedItem = (index: number) => {
    setIsLoading(true);
    setSavedForLater((prev) => prev.filter((_, i) => i !== index));
    setTimeout(() => setIsLoading(false), 500);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = deliveryOption === "standard" ? 15.0 : 25.0; // Standard: $15, Express: $25
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  // Count total items
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Get related products for "Frequently bought together"
  const getRelatedProducts = () => {
    const cartProductIds = new Set(cartItems.map((item) => item.productId));
    const relatedProducts = products
      .filter((product) => !cartProductIds.has(product.productId))
      .slice(0, 2)
      .map((product) => ({
        productId: product.productId,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.imageUrls[0]
          ? `${baseURL}${product.imageUrls[0]}`
          : "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop",
        color: product.specification
          ? JSON.parse(product.specification).Color || "Default"
          : "Default",
      }));

    return relatedProducts;
  };

  const relatedProducts = getRelatedProducts();

  // Add related product to cart
  const handleAddRelatedProduct = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: { cartItems, subtotal, shipping, tax, total, deliveryOption },
    });
  };

  if (isInitialLoading) {
    return <LoadingSpinner size="large" fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <Link
            to="/"
            className="text-gray-500 hover:text-brandiaga-yellow-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
              <ShoppingCart className="w-full h-full text-gray-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-medium mb-2">
              Your Cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Your shopping cart lives to serve. Give it purpose — fill it with
              groceries, clothing, household supplies, electronics, and more.
            </p>
            <Button
              className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"
              asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">
                Recommendations for you
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product) => (
                  <Link
                    to={`/products/${product.productId}}`}
                    key={product.productId}
                    className="bg-gray-50 p-2 rounded">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={
                          product.imageUrls[0]
                            ? `${baseURL}${product.imageUrls[0]}`
                            : "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
                        }}
                      />
                    </AspectRatio>
                    <div className="text-xs mt-2 text-left">
                      <p className="line-clamp-2">{product.name}</p>
                      <p className="font-bold mt-1">
                        ${(product.discountPrice || product.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Shopping Cart
                  </h2>
                  <span className="text-sm text-gray-500">Price</span>
                </div>

                {isLoading && (
                  <div className="flex justify-center items-center p-4 bg-yellow-50">
                    <LoadingSpinner size="small" fullScreen={false} />
                    <span className="text-sm ml-2">Updating cart...</span>
                  </div>
                )}

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={`${item.productId}-${item.color}`}
                      className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 md:w-32 sm:h-24 md:h-32 flex-shrink-0 mb-4 sm:mb-0 mx-auto sm:mx-0">
                          <AspectRatio ratio={1 / 1} className="bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
                              }}
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <Link
                                to={`/products/${item.productId}`}
                                className="text-lg font-medium text-gray-900 hover:text-brandiaga-yellow-600">
                                {item.name}
                              </Link>
                              <p className="text-green-600 text-sm mt-1">
                                In Stock
                              </p>
                              <p className="text-gray-500 text-sm">
                                Color: {item.color}
                              </p>

                              {item.isPrime && (
                                <div className="flex items-center mt-1">
                                  <span className="bg-blue-100 text-blue-800 text-xs px-1 rounded mr-2">
                                    Prime
                                  </span>
                                  <span className="text-xs text-gray-600">
                                    FREE delivery by tomorrow
                                  </span>
                                </div>
                              )}

                              <div className="flex flex-wrap items-center gap-2 mt-4">
                                <select
                                  className="p-1 border border-gray-300 rounded-md bg-gray-50 text-sm"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.productId,
                                      item.color,
                                      parseInt(e.target.value),
                                    )
                                  }
                                  aria-label={`Select quantity for ${item.name}`}>
                                  {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                                <span className="hidden sm:inline text-gray-400">
                                  |
                                </span>
                                <Button
                                  variant="ghost"
                                  className="text-sm text-blue-600 hover:text-blue-800 hover:bg-transparent p-0 h-auto"
                                  onClick={() =>
                                    removeItem(item.productId, item.color)
                                  }
                                  aria-label={`Delete ${item.name} from cart`}>
                                  Delete
                                </Button>
                                <span className="hidden sm:inline text-gray-400">
                                  |
                                </span>
                                <Button
                                  variant="ghost"
                                  className="text-sm text-blue-600 hover:text-blue-800 hover:bg-transparent p-0 h-auto"
                                  onClick={() => saveForLater(item)}
                                  aria-label={`Save ${item.name} for later`}>
                                  Save for later
                                </Button>
                              </div>
                            </div>
                            <div className="text-right mt-4 sm:mt-0">
                              <p className="font-bold text-lg">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-4 sm:p-6 border-t border-gray-200 text-right">
                  <div className="text-lg font-bold">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                    <span className="text-brandiaga-yellow-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Saved for Later */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">
                    Saved for Later ({savedForLater.length} items)
                  </h2>
                </div>

                {savedForLater.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No items saved for later</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {savedForLater.map((item, index) => (
                      <li
                        key={`${item.productId}-${item.color}`}
                        className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-24 md:w-32 sm:h-24 md:h-32 flex-shrink-0 mb-4 sm:mb-0 mx-auto sm:mx-0">
                            <AspectRatio ratio={1 / 1} className="bg-gray-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
                                }}
                              />
                            </AspectRatio>
                          </div>
                          <div className="flex-1 sm:ml-6">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <Link
                                  to={`/products/${item.productId}`}
                                  className="text-lg font-medium text-gray-900 hover:text-brandiaga-yellow-600">
                                  {item.name}
                                </Link>
                                <p className="text-green-600 text-sm mt-1">
                                  In Stock
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Color: {item.color}
                                </p>
                                {item.isPrime && (
                                  <div className="flex items-center mt-1">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-1 rounded mr-2">
                                      Prime
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      FREE delivery by tomorrow
                                    </span>
                                  </div>
                                )}
                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                  <Button
                                    variant="ghost"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:bg-transparent p-0 h-auto"
                                    onClick={() => moveToCart(item, index)}
                                    aria-label={`Move ${item.name} to cart`}>
                                    Move to cart
                                  </Button>
                                  <span className="hidden sm:inline text-gray-400">
                                    |
                                  </span>
                                  <Button
                                    variant="ghost"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:bg-transparent p-0 h-auto"
                                    onClick={() => removeSavedItem(index)}
                                    aria-label={`Delete ${item.name} from saved for later`}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right mt-4 sm:mt-0">
                                <p className="font-bold text-lg">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:block">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-20">
                {isLoading ? (
                  <div className="flex justify-center items-center py-2">
                    <LoadingSpinner size="small" fullScreen={false} />
                    <span className="text-sm ml-2">Updating...</span>
                  </div>
                ) : (
                  <>
                    <div className="text-lg font-bold mb-4">
                      Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}
                      ):{" "}
                      <span className="text-brandiaga-yellow-800">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm mb-4">
                      <p>
                        Shipping:{" "}
                        <span className="text-brandiaga-yellow-800">
                          ${shipping.toFixed(2)}
                        </span>
                      </p>
                      <p>
                        Tax:{" "}
                        <span className="text-brandiaga-yellow-800">
                          ${tax.toFixed(2)}
                        </span>
                      </p>
                      <p className="font-bold mt-2">
                        Total:{" "}
                        <span className="text-brandiaga-yellow-800">
                          ${total.toFixed(2)}
                        </span>
                      </p>
                    </div>

                    <Button
                      className="w-full bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900 mb-4 flex items-center justify-center"
                      onClick={handleProceedToCheckout}
                      aria-label="Proceed to checkout">
                      Proceed to checkout{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* Delivery Options */}
                    <div className="border-t pt-4 mt-2">
                      <h3 className="font-medium text-sm mb-2">
                        Delivery options:
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id="standard"
                            name="delivery"
                            className="mt-1 mr-2"
                            checked={deliveryOption === "standard"}
                            onChange={() => setDeliveryOption("standard")}
                            aria-label="Standard Delivery"
                          />
                          <label htmlFor="standard" className="text-sm">
                            <span className="font-medium">
                              Standard Delivery
                            </span>
                            <span className="block text-xs text-gray-500">
                              3-5 business days
                            </span>
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id="express"
                            name="delivery"
                            className="mt-1 mr-2"
                            checked={deliveryOption === "express"}
                            onChange={() => setDeliveryOption("express")}
                            aria-label="Express Delivery"
                          />
                          <label htmlFor="express" className="text-sm">
                            <span className="font-medium">
                              Express Delivery (+$10.00)
                            </span>
                            <span className="block text-xs text-gray-500">
                              1-2 business days
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Frequently Bought Together */}
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h3 className="font-bold text-sm mb-3">
                  Frequently bought together
                </h3>
                {relatedProducts.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    No recommendations available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {relatedProducts.map((product) => (
                      <div
                        key={`${product.productId}-${product.color}`}
                        className="flex gap-3 items-center">
                        <AspectRatio ratio={1 / 1} className="w-16">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
                            }}
                          />
                        </AspectRatio>
                        <div className="flex-1">
                          <p className="text-xs line-clamp-2">{product.name}</p>
                          <p className="text-xs font-bold mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleAddRelatedProduct(product)}
                          aria-label={`Add ${product.name} to cart`}>
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
