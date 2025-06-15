import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "./header/MobileHeader";
import DesktopHeader from "./header/DesktopHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RootState } from '@/redux/store.js';

interface Category {
  name: string;
  href: string;
  featured?: string[];
}

const categories: Category[] = [
  {
    name: "Digital Content & Devices",
    href: "#",
    featured: ["Prime Video", "Amazon Music", "Kindle E-readers & Books", "Amazon Appstore"]
  },
  {
    name: "Shop By Department",
    href: "#",
    featured: ["Electronics", "Computers", "Smart Home", "Arts & Crafts", "Automotive", "Baby", "Beauty & Personal Care", "Books"]
  },
  {
    name: "Programs & Features",
    href: "#",
    featured: ["Gift Cards", "Shop By Interest", "Amazon Live", "International Shopping", "Credit & Payment Products"]
  },
  {
    name: "Help & Settings",
    href: "#",
    featured: ["Your Account", "Customer Service", "Sign in", "English", "United States"]
  }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const cartItemsCount = useSelector((state: RootState) =>
      state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Auto-scrolling logic for carousel
  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (carouselApi) {
      // Set up auto-scrolling
      interval = setInterval(() => {
        carouselApi.scrollNext();
      }, 3000); // Scroll every 3 seconds
    }

    // Clean up on unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [carouselApi]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
      <header
          className={cn(
              "sticky top-0 z-50 w-full transition-all duration-300",
              isScrolled ? "bg-black shadow-md" : "bg-black"
          )}
      >
        <div className="bg-black text-white py-1">
          <div className="container mx-auto px-0 md:px-4">
            {isMobile ? (
                <MobileHeader
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    categories={categories}
                    cartCount={cartItemsCount}
                />
            ) : (
                <DesktopHeader cartCount={cartItemsCount} />
            )}
          </div>
        </div>

        <div className="bg-gray-800 text-gray-300">
          <div className="container mx-auto px-4 py-2">
            <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  skipSnaps: false,
                }}
                className="w-full"
                setApi={setCarouselApi}
            >
              <CarouselContent>
                {categories.map((category) => (
                    <CarouselItem key={category.name} className="basis-auto">
                      <Link
                          to={category.href}
                          className="whitespace-nowrap px-3 py-1 text-sm hover:text-brandiaga-yellow-400 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </header>
  );
};

export default Header;