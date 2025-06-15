import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/products/ProductCard";
import BrandCard from "@/components/brands/BrandCard";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Star } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Premium Noise-Canceling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    brand: "TechGiant",
    rating: 4.8,
    reviewCount: 350,
  },
  {
    id: "2",
    name: "Smartphone Pro Max",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    brand: "TechGiant",
    rating: 4.9,
    reviewCount: 420,
  },
  {
    id: "3",
    name: "Smart Watch Elite",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    brand: "TechGiant",
    rating: 4.7,
    reviewCount: 189,
  },
  {
    id: "4",
    name: "Wireless Earbuds Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
    brand: "TechGiant",
    rating: 4.6,
    reviewCount: 234,
  },
];

const featuredBrands = [
  { 
    id: "1", 
    name: "TechGiant", 
    logo: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=200&q=80&fit=crop",
    productCount: 120 
  },
  { 
    id: "2", 
    name: "FashionStyle", 
    logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80&fit=crop",
    productCount: 85 
  },
  { 
    id: "3", 
    name: "HomeDecor", 
    logo: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80&fit=crop",
    productCount: 65 
  },
  { 
    id: "4", 
    name: "SportLife", 
    logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80&fit=crop",
    productCount: 50 
  },
  { 
    id: "5", 
    name: "BeautyGlow", 
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80&fit=crop",
    productCount: 78 
  },
  { 
    id: "6", 
    name: "GourmetTaste", 
    logo: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=200&q=80&fit=crop",
    productCount: 92 
  },
];

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "Brandiaga has become my go-to marketplace for all my shopping needs. The selection of brands is unmatched!",
    avatar: "https://source.unsplash.com/random/100x100/?woman",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Tech Enthusiast",
    content: "I love the seamless shopping experience and the quality of products. The customer service is exceptional too!",
    avatar: "https://source.unsplash.com/random/100x100/?man",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Fashion Blogger",
    content: "As someone who's always looking for unique fashion pieces, Brandiaga delivers every time with their curated brands.",
    avatar: "https://source.unsplash.com/random/100x100/?woman-2",
  },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen pb-8">
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[300px] md:h-[400px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80"
                  alt="Banner"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/70 via-black/30 to-transparent">
                  <div className="container mx-auto px-4">
                    <div className="max-w-xl space-y-6">
                      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight animate-fade-in">
                        Save on Select Products
                        <br />
                        <span className="text-brandiaga-yellow-400">Up to 50% Off</span>
                      </h1>
                      <Button className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900 animate-fade-in animation-delay-200">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[300px] md:h-[400px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1600375104627-c94c902959c4?w=1200&q=80"
                  alt="Banner"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/70 via-black/30 to-transparent">
                  <div className="container mx-auto px-4">
                    <div className="max-w-xl space-y-6">
                      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight animate-fade-in">
                        New Electronics Arrivals
                        <br />
                        <span className="text-brandiaga-yellow-400">Limited Time Offers</span>
                      </h1>
                      <Button className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900 animate-fade-in animation-delay-200">
                        Explore Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </div>
        </Carousel>
      </section>
      
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Electronics', 'Fashion', 'Home', 'Beauty'].map((category, index) => (
            <div 
              key={category} 
              className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h2 className="text-xl font-bold mb-3">{category}</h2>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <Link 
                    key={item} 
                    to={`/products?category=${category.toLowerCase()}&item=${item}`}
                    className="block"
                  >
                    <img 
                      src={`https://source.unsplash.com/random/150x150/?${category.toLowerCase()},${item}`} 
                      alt={`${category} item ${item}`}
                      className="w-full h-24 object-cover rounded-sm"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&h=150&fit=crop";
                      }}
                    />
                  </Link>
                ))}
              </div>
              <Link 
                to={`/products?category=${category.toLowerCase()}`}
                className="block text-brandiaga-yellow-600 hover:text-brandiaga-yellow-800 text-sm mt-4"
              >
                See all {category}
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Top Sellers</h2>
            <Link 
              to="/products" 
              className="text-brandiaga-yellow-600 hover:text-brandiaga-yellow-800 flex items-center text-sm"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <Carousel>
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </div>
          </Carousel>
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-md shadow-md p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Get up to 50% off on your first purchase. Limited time offer!
              </p>
              <Button size="lg" className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900">
                Shop Now
              </Button>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://source.unsplash.com/random/600x400/?sale" 
                alt="Special Offer" 
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-md shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Frequently Purchased</h2>
            <div className="space-y-4">
              {featuredProducts.slice(0, 2).map(product => (
                <div key={product.id} className="flex gap-3 items-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=80&h=80&fit=crop";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                    <div className="flex text-brandiaga-yellow-500 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-2">
              {['Electronics', 'Fashion', 'Home', 'Beauty'].map((category) => (
                <Link 
                  key={category} 
                  to={`/products?category=${category.toLowerCase()}`}
                  className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <h3 className="font-medium">{category}</h3>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-4">
            <h2 className="text-lg font-bold mb-2">Sign in for the best experience</h2>
            <Button 
              asChild
              className="w-full bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900 mb-4"
            >
              <Link to="/signin">Sign in securely</Link>
            </Button>
            <div className="pt-2 border-t">
              <h3 className="text-sm font-medium mb-2">New to Brandiaga?</h3>
              <Button asChild variant="outline" className="w-full">
                <Link to="/signup">Start here</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Food'].map((category, index) => (
              <Link 
                key={category} 
                to={`/products?category=${category.toLowerCase()}`}
                className={`bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all group animate-scale-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-brandiaga-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brandiaga-yellow-400 transition-colors">
                  <img 
                    src={`https://source.unsplash.com/random/100x100/?${category.toLowerCase()}`} 
                    alt={category}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
                    }}
                  />
                </div>
                <h3 className="font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Get up to 50% off on your first purchase. Limited time offer!
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900">
                  Shop Now
                </Button>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-lg">
                      <span className="text-2xl font-bold">
                        {i === 0 ? "00" : i === 1 ? "12" : i === 2 ? "59" : "59"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://source.unsplash.com/random/600x400/?sale" 
                alt="Special Offer" 
                className="rounded-lg shadow-2xl animate-float"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Brand</h2>
          <Carousel className="overflow-x-hidden">
            <CarouselContent className="-ml-4">
              {featuredBrands.map((brand) => (
                <CarouselItem key={brand.id} className="pl-4 md:basis-1/3 lg:basis-1/6">
                  <BrandCard brand={brand} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </div>
          </Carousel>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="animate-scale-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-brandiaga-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for the latest products, brands, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 sm:min-w-[300px]"
              />
              <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
