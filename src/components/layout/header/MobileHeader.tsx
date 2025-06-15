import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { cn } from "@/lib/utils";
import MobileMenuButton from "./mobile/MobileMenuButton";
import MobileAccountButton from "./mobile/MobileAccountButton";
import MobileCartButton from "./mobile/MobileCartButton";
import MobileSearchToggle from "./mobile/MobileSearchToggle";
import MobileSideMenu from "./mobile/MobileSideMenu";
import LocationPicker from "./LocationPicker";
import { RootState } from '@/redux/store.js';

interface Category {
  name: string;
  href: string;
  featured?: string[];
}

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  categories: Category[];
}

const MobileHeader = ({
                        isMobileMenuOpen,
                        setIsMobileMenuOpen,
                        categories
                      }: MobileHeaderProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const cartCount = useSelector((state: RootState) =>
      state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Transform categories to the format expected by MobileSideMenu
  const sideMenuCategories = [
    {
      title: "Trending",
      items: [
        { name: "Best Sellers", href: "/trending/best-sellers" },
        { name: "New Releases", href: "/trending/new-releases" },
        { name: "Movers & Shakers", href: "/trending/movers-shakers" }
      ]
    },
    {
      title: "Shop By Department",
      items: [
        { name: "Electronics", href: "/electronics" },
        { name: "Computers", href: "/computers" },
        { name: "Smart Home", href: "/smart-home" },
        { name: "Arts & Crafts", href: "/arts-crafts" }
      ]
    },
    {
      title: "Programs & Features",
      items: [
        { name: "Gift Cards", href: "/gift-cards" },
        { name: "Shop By Interest", href: "/shop-by-interest" },
        { name: "Brandiaga Live", href: "/brandiaga-live" },
        { name: "International Shopping", href: "/international-shopping" }
      ]
    },
    {
      title: "Help & Settings",
      items: [
        { name: "Your Account", href: "/account" },
        { name: "Customer Service", href: "/customer-service" },
        { name: "Admin Panel", href: "/admin" },
        { name: "English", href: "/language" },
        { name: "United States", href: "/country" }
      ]
    }
  ];

  return (
      <div className="flex flex-col w-full">
        <div className={cn(
            "flex items-center justify-between w-full py-2 px-4 bg-[#232f3e]",
            isSearchExpanded ? "hidden" : "flex"
        )}>
          <div className="flex items-center">
            <MobileMenuButton onClick={toggleMenu} />
            <Link to="/" className="flex items-center gap-2">
              <img
                  src="/lovable-uploads/d8574f1a-1fd7-4fd9-868c-e4db96b4d1b2.png"
                  alt="Logo"
                  className="h-8 w-8"
                  draggable={false}
              />
              <span className="text-brandiaga-yellow-400 text-xl font-bold animate-blink">
              Brandiaga
            </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <MobileAccountButton />
            <MobileCartButton cartCount={cartCount} />
          </div>
        </div>

        <div className={cn(
            "flex items-center px-4 py-1 bg-[#232f3e] border-t border-gray-700",
            isSearchExpanded ? "hidden" : "flex"
        )}>
          <LocationPicker />
        </div>

        <MobileSearchToggle
            isExpanded={isSearchExpanded}
            onToggle={toggleSearch}
        />

        <MobileSideMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            categories={sideMenuCategories}
        />
      </div>
  );
};

export default MobileHeader;