import React, {useState, useRef, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {Button} from "@/components/ui/button";
import {Heart, ShoppingCart, Star, TruckIcon, ChevronRight, Trash2} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import {baseURL} from "@/hooks/UseAxiosSecure";
import {GetProductsRequest} from "@/Request/ProductRequest";
import {addToCart} from '@/redux/Slicers/CartSlice';
import {RootState} from '@/redux/store.js';
import {GetReviewsRequest, AddReviewRequest} from "@/Request/ReviewRequest.tsx";
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {AlertDialog} from "@radix-ui/react-alert-dialog";
import {toast} from "@/hooks/use-toast.ts";


// Define interfaces for type safety
interface Product {
    productId: string;
    name: string;
    sku: string;
    price: number;
    discountPrice?: number;
    categoryId: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
    imageUrls: string[];
    description: string;
    specification: string;
    stock?: number;
    rating?: number;
    reviewCount?: number;
}

interface Specifications {
    [key: string]: string;
}

interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    disCountedPrice?: number;
    image: string;
    brand: string;
    rating: number;
    reviewCount: number;
    categoryId: string;
    categoryName: string;
}

interface Review {
    reviewId: string;
    userId: string;
    username: string;
    productId: string;
    productName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

const ProductDetail: React.FC = () => {
    const {productId} = useParams<{ productId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [newReview, setNewReview] = useState<{ rating: number; comment: string }>({rating: 0, comment: ""});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    // Check login status
    useEffect(() => {
        const token = localStorage.getItem("user");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    // Fetch products and reviews
    useEffect(() => {
        (async () => {
            try {
                const [productRes, reviewRes] = await Promise.all([
                    GetProductsRequest(),
                    GetReviewsRequest(productId),
                ]);
                setProducts(productRes.data as Product[]);
                setReviews(reviewRes.data as Review[]);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        })();
    }, [productId]);

    // Find the product by productId
    const product: Product = products.find((p) => p.productId === productId) || {
        productId: "",
        name: "Loading...",
        sku: "",
        price: 0,
        categoryId: "",
        categoryName: "",
        createdAt: "",
        updatedAt: "",
        imageUrls: [],
        description: "",
        specification: "{}",
    };

    // Parse specifications
    const specifications: Specifications = product.specification ? JSON.parse(product.specification) : {};

    // Get available colors from specifications
    const colors: string[] = specifications.Color ? [specifications.Color] : [];

    // Set initial color
    useEffect(() => {
        if (colors.length > 0 && !selectedColor) {
            setSelectedColor(colors[0]);
        }
    }, [colors, selectedColor]);

    // Quantity handlers
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        if (quantity < (product.stock || 10)) setQuantity(quantity + 1);
    };

    // Handle image zoom
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const {left, top, width, height} = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({x, y});
    };

    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);

    // Related products
    const relatedProducts: RelatedProduct[] = products
        .filter((p) => p.productId !== productId && p.categoryName === product.categoryName)
        .slice(0, 4)
        .map((p) => ({
            id: p.productId,
            name: p.name,
            price: p.price,
            disCountedPrice: p.discountPrice,
            image: p.imageUrls[0] ? `${baseURL}${p.imageUrls[0]}` : "",
            brand: p.categoryName,
            rating: p.rating || 4.5,
            reviewCount: p.reviewCount || 0,
            categoryId: p.categoryId,
            categoryName: p.categoryName,
        }));

    // Add to cart handler
    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: product.productId,
                name: product.name,
                price: product.discountPrice || product.price,
                quantity: quantity,
                image: product.imageUrls[0] ? `${baseURL}${product.imageUrls[0]}` : "",
                color: selectedColor,
            })
        );
    };

    // Review submission handler
    const handleSubmitReview = async () => {
        if (!newReview.rating || !newReview.comment.trim()) {
            alert("Please provide a rating and comment.");
            return;
        }

        try {
            const payload = {
                productId: productId!,
                rating: newReview.rating,
                comment: newReview.comment,
            };
            const res = await AddReviewRequest(payload);
            if(res){
                setReviews((prev) => [res.data, ...prev]);
                setNewReview({rating: 0, comment: ""});
                toast({
                    title: "Review Added",
                    description: "Review submitted successfully!",
                });
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
    };

    // Render stars for review input
    const renderStars = (rating: number, onClick?: (rating: number) => void) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= rating ? 'fill-brandiaga-yellow-500 text-brandiaga-yellow-500' : 'text-gray-300'}`}
                        onClick={() => onClick && onClick(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm mb-8">
                    <Link to="/" className="text-gray-500 hover:text-brandiaga-yellow-600">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400"/>
                    <Link to="/products" className="text-gray-500 hover:text-brandiaga-yellow-600">Products</Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400"/>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images with Zoom Effect */}
                        <div className="space-y-4">
                            <div
                                ref={imageRef}
                                className="relative bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{height: '400px'}}
                            >
                                {isZoomed ? (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `url(${baseURL}${product.imageUrls[selectedImage]})`,
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundSize: '200%',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={product.imageUrls[0] ? `${baseURL}${product.imageUrls[selectedImage]}` : "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=600&fit=crop"}
                                        alt={product.name}
                                        className="w-full h-full object-contain animate-scale-up"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=600&fit=crop";
                                        }}
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.imageUrls.map((image: string, i: number) => (
                                    <div
                                        key={i}
                                        className={`aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition-colors ${selectedImage === i ? 'border-brandiaga-yellow-400' : 'border-transparent hover:border-gray-300'}`}
                                        onClick={() => setSelectedImage(i)}
                                    >
                                        <img
                                            src={`${baseURL}${image}`}
                                            alt={`${product.name} view ${i + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <p className="text-brandiaga-yellow-600 font-medium mb-1">{product.categoryName}</p>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <div className="flex items-center mt-2">
                                    <div className="flex text-brandiaga-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">
                    {product.rating || 4.5} ({product.reviewCount || 0} reviews)
                  </span>
                                </div>
                            </div>

                            {/* Price section */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-3xl font-bold">${(product.discountPrice || product.price).toFixed(2)}</span>
                                    {product.discountPrice && product.discountPrice < product.price && (
                                        <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                                            <span
                                                className="px-2 py-0.5 bg-red-100 text-red-600 text-sm font-medium rounded">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Incl. taxes & shipping</p>
                            </div>

                            {/* Colors options */}
                            {colors.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-2">Colors</h3>
                                    <div className="flex space-x-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                className={`px-3 py-1 rounded-full border ${selectedColor === color ? 'border-brandiaga-yellow-400 bg-brandiaga-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity selector */}
                            <div>
                                <h3 className="font-medium mb-2">Quantity</h3>
                                <div className="flex items-center">
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="w-16 px-3 py-1 text-center border-t border-b border-gray-300"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val >= 1 && val <= (product.stock || 10)) setQuantity(val);
                                        }}
                                        min={1}
                                        max={product.stock || 10}
                                    />
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                                        onClick={increaseQuantity}
                                        disabled={quantity >= (product.stock || 10)}
                                    >
                                        +
                                    </button>
                                    <span className="ml-4 text-sm text-gray-500">
                    {product.stock || 10} items available
                  </span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    size="lg"
                                    className="flex-1 bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5"/>
                                    Add to Cart
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Heart className="mr-2 h-5 w-5"/>
                                    Add to Wishlist
                                </Button>
                            </div>

                            {/* Shipping info */}
                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <TruckIcon className="h-4 w-4 mr-2 text-gray-400"/>
                                    Free delivery within 3-5 working days
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    30-day money-back guarantee
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="flex border-b">
                        {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-3 font-medium ${activeTab === tab ? 'border-b-2 border-brandiaga-yellow-400 text-brandiaga-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {/* Product description tab */}
                        {activeTab === 'description' && (
                            <div className="space-y-4">
                                <div dangerouslySetInnerHTML={{__html: product.description}}/>
                            </div>
                        )}

                        {/* Product specifications tab */}
                        {activeTab === 'specifications' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(specifications).map(([key, value]) => (
                                    <div key={key} className="border-b pb-2">
                                        <span className="font-medium">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Product reviews tab */}
                        {activeTab === 'reviews' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center">
                                            <span className="text-3xl font-bold mr-2">{product.rating || 4.5}</span>
                                            <div className="flex text-brandiaga-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : ''}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews
                                        </div>
                                    </div>
                                    {!isLoggedIn && (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"

                                                >
                                                    Write a Review
                                                </Button>

                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <div className={`flex justify-between`}>
                                                        <AlertDialogTitle>Please Log In</AlertDialogTitle>
                                                        <AlertDialogCancel> ❌</AlertDialogCancel>
                                                    </div>
                                                    <AlertDialogDescription>
                                                        You need to be logged in to write a review.{" "}
                                                        <Link to="/signin"
                                                              className="underline hover:text-brandiaga-yellow-600">
                                                            Log in here
                                                        </Link>.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                            </AlertDialogContent>
                                        </AlertDialog>


                                    )}
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-6 mb-8">
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <div key={review.reviewId} className="border-b pb-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <span className="font-medium mr-2">{review.username}</span>
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                                                </div>
                                                <p className="mt-2 text-gray-700">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-700 italic">No reviews yet for this product.</p>
                                    )}
                                </div>

                                {/* Review Input for Logged-in Users */}
                                {isLoggedIn && (
                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Rating</label>
                                                {renderStars(newReview.rating, (rating) =>
                                                    setNewReview((prev) => ({...prev, rating}))
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Your Review</label>
                                                <textarea
                                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandiaga-yellow-400"
                                                    rows={5}
                                                    value={newReview.comment}
                                                    onChange={(e) =>
                                                        setNewReview((prev) => ({...prev, comment: e.target.value}))
                                                    }
                                                    placeholder="Share your experience with this product..."
                                                />
                                            </div>
                                            <Button
                                                className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900"
                                                onClick={handleSubmitReview}
                                                disabled={!newReview.rating || !newReview.comment.trim()}
                                            >
                                                Submit Review
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 ? (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            No Item Found
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;