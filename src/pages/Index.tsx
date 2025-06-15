
import MainSlider from "@/components/layout/MainSlider";
import BrandiagaWatermark from "@/components/BrandiagaWatermark";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

/**
 * Featured product categories for the home page grid
 */
const featuredCategories = [
  {
    id: 1,
    title: "Electronics Deals",
    description: "Top deals on the latest gadgets",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    link: "/products?category=electronics"
  },
  {
    id: 2,
    title: "Fashion Collection",
    description: "Trendy styles for every season",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/products?category=fashion"
  },
  {
    id: 3,
    title: "Home & Kitchen",
    description: "Essentials for your living space",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/products?category=home"
  },
  {
    id: 4,
    title: "Beauty Products",
    description: "Self-care essentials and more",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    link: "/products?category=beauty"
  }
];

/**
 * Index page component - acts as the home page
 * Features a main slider and responsive grid of product categories
 */
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 relative">
      {/* Main slider - full width */}
      <div className="w-full">
        <MainSlider />
      </div>
      
      {/* Feature categories grid - responsive */}
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredCategories.map((category) => (
            <Link to={category.link} key={category.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  <button className="mt-3 text-sm text-blue-600 hover:underline">
                    Shop now
                  </button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Product deals section */}
        <section className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Today's Deals
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link to={`/products/${i + 1}`} key={i} className="group">
                <div className="bg-white rounded-md p-3 hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100 mb-2">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Product {i + 1}
                    </div>
                  </div>
                  <div className="text-sm font-medium truncate">Product Name {i + 1}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-bold">$19.99</span>
                    <span className="text-gray-500 text-xs line-through">$29.99</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      
      {/* Watermark */}
      <BrandiagaWatermark />
    </div>
  );
};

export default Index;
