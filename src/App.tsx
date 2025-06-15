
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode, useState, useEffect, createContext } from "react";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import SignIn from "@/pages/SignIn";
import Admin from "@/pages/Admin";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/ui/loading-spinner";
import { ProductQuickViewModal } from "./hooks/use-product-quick-view";

// Import new pages
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import TrackOrder from "./pages/TrackOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import SellerPolicy from "./pages/SellerPolicy";

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {}
});

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Simulate application loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };
  const PublicRoute = ({ children }) => {

    if (isAuthenticated) {
      return <Navigate to="/" replace />; // Redirect to home or dashboard
    }
    return children;
  };
  if (isLoading) {
    return <LoadingSpinner size="large" fullScreen={true} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ProductQuickViewModal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="seller-policy" element={<SellerPolicy />} />
              </Route>
              <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
