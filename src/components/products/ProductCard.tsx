import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useProductQuickView } from "@/hooks/use-product-quick-view";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/Slicers/CartSlice';
import { baseURL } from "@/hooks/UseAxiosSecure";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    disCountedPrice?: number;
    price: number;
    image: string;
    brand: string;
    rating: number;
    reviewCount: number;
    images?: string[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { openQuickView } = useProductQuickView();
  const dispatch = useDispatch();

  // If product has multiple images, use them, otherwise create dummy array with main image
  const productImages = product.images || [product.image, product.image];

  // Auto slide images on hover
  const startImageSlideshow = () => {
    if (productImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 1200);
      return () => clearInterval(interval);
    }
  };

  const stopImageSlideshow = () => {
    setCurrentImageIndex(0);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    openQuickView(product);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.disCountedPrice || product.price,
          quantity: 1,
          image: baseURL + productImages[0],
          color: "Default", // Default color, as ProductCard doesn't provide color selection
        })
    );

    // Simulate API call delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
      <div
          className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          onMouseEnter={startImageSlideshow}
          onMouseLeave={stopImageSlideshow}
      >
        {/* Product Image */}
        <Link to={`/products/${product.id}`} className="block relative">
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white hover:scale-110 transition-all"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white hover:scale-110 transition-all"
                onClick={handleQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <AspectRatio ratio={4/3} className="bg-gray-100 overflow-hidden">
            <img
                src={baseURL + productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop";
                }}
            />
          </AspectRatio>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 mb-1 group-hover:text-brandiaga-yellow-600 transition-colors line-clamp-2 min-h-[48px]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-1">
            <div className="flex text-brandiaga-yellow-500">
              {[...Array(5)].map((_, i) => (
                  <Star
                      key={i}
                      className={`h-4 w-4 transition-transform group-hover:scale-110 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                  />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>

          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

          <div className="flex items-center justify-between">
            <div>
              {product.disCountedPrice ? (
                  <>
                    <span className="font-bold text-xl">${product.disCountedPrice.toFixed(2)}</span>
                    <s className="font-bold text-gray-900 group-hover:text-brandiaga-yellow-600 transition-colors ml-5">
                      ${product.price.toFixed(2)}
                    </s>
                  </>
              ) : (
                  <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
              )}
            </div>

            <Button
                size="sm"
                className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900 transform group-hover:scale-105 transition-all"
                onClick={handleAddToCart}
                disabled={isAdding}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isAdding ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;