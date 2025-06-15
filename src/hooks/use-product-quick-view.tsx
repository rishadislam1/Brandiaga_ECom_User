
import { create } from 'zustand';
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {baseURL} from "@/hooks/UseAxiosSecure";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  reviewCount: number;
  images?: string[];
  description?: string;
};

type QuickViewStore = {
  isOpen: boolean;
  product: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
};

const useQuickViewStore = create<QuickViewStore>((set) => ({
  isOpen: false,
  product: null,
  openQuickView: (product) => set({ isOpen: true, product }),
  closeQuickView: () => set({ isOpen: false }),
}));

export const useProductQuickView = () => {
  return {
    isOpen: useQuickViewStore((state) => state.isOpen),
    product: useQuickViewStore((state) => state.product),
    openQuickView: useQuickViewStore((state) => state.openQuickView),
    closeQuickView: useQuickViewStore((state) => state.closeQuickView),
  };
};

// Component for quick view modal
export const ProductQuickViewModal = () => {
  const { isOpen, product, closeQuickView } = useProductQuickView();
  const [imageIndex, setImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Reset state when modal opens with new product
  useEffect(() => {
    if (isOpen) {
      setImageIndex(0);
      setIsZoomed(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Handle navigation to product detail page
  const handleViewFullDetails = () => {
    if (!product) return;
    closeQuickView();
    // Instead of relying on Link component that requires Router context,
    // we'll just use a standard anchor tag for the quick view modal
    window.location.href = `/products/${product.id}`;
  };

  // Get product images or fallback to single image
  const images = product.images || [product.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={closeQuickView}>
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          {/* Product image section */}
          <div className="md:w-1/2 p-4">
            <div 
              className={`relative overflow-hidden rounded-lg cursor-zoom-in ${isZoomed ? 'h-[400px]' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isZoomed && setIsZoomed(false)}
            >
              {isZoomed ? (
                <div 
                  className="absolute w-[200%] h-[200%] transform"
                  style={{ 
                    backgroundImage: `url(${baseURL+images[imageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    top: `-${zoomPosition.y}%`,
                    left: `-${zoomPosition.x}%`,
                    width: '200%',
                    height: '200%'
                  }}
                />
              ) : (
                <img 
                  src={baseURL+images[imageIndex]}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=500&fit=crop";
                  }}
                />
              )}
            </div>
            
            {/* Thumbnail images */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-auto pb-2">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`cursor-pointer border-2 rounded overflow-hidden w-16 h-16 flex-shrink-0 ${
                      idx === imageIndex ? 'border-brandiaga-yellow-400' : 'border-gray-200'
                    }`}
                    onClick={() => setImageIndex(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info section */}
          <div className="md:w-1/2 p-6 flex flex-col">
            <button 
              className="self-end text-gray-500 hover:text-gray-800 mb-2"
              onClick={closeQuickView}
            >
              &times; Close
            </button>
            
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex text-brandiaga-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-6 line-clamp-4">
              {product.description || "Experience the premium quality and performance of this exceptional product. Perfect for everyday use with its durable design and elegant finish."}
            </p>
            
            <div className="flex gap-2 mt-auto">
              <Button 
                className="flex-1 bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                className="text-brandiaga-yellow-600 hover:underline"
                onClick={handleViewFullDetails}
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
