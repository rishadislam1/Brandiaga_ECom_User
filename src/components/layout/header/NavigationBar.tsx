
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Props for NavigationBar component
 */
interface NavigationBarProps {
  categories: {
    name: string;
    href: string;
    featured?: string[];
  }[];
}

/**
 * NavigationBar component for displaying category navigation
 * Similar to Amazon's navigation bar below the header
 */
const NavigationBar = ({ categories }: NavigationBarProps) => {
  // For animation, we "scroll" the nav container leftward periodically
  const navRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect for navigation items on desktop
  useEffect(() => {
    if (!navRef.current) return;
    let interval: any = null;
    let scrollStep = 1; // pixels to scroll per frame
    
    // Function to start auto-scrolling
    function startAutoScroll() {
      interval = setInterval(() => {
        if (!navRef.current || isHovered) return;
        navRef.current.scrollLeft = navRef.current.scrollLeft + scrollStep;
        if (
          navRef.current.scrollLeft + navRef.current.offsetWidth >=
          navRef.current.scrollWidth
        ) {
          navRef.current.scrollLeft = 0; // Rewind for infinite loop
        }
      }, 30);
    }
    
    startAutoScroll();
    
    // Clean up interval on component unmount
    return () => interval && clearInterval(interval);
  }, [isHovered]);

  return (
    <nav className="w-full bg-gray-800 text-white shadow-inner border-t border-gray-700">
      <div
        ref={navRef}
        className="flex gap-6 px-4 py-2 overflow-x-auto no-scrollbar transition-all"
        style={{ scrollBehavior: "smooth" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* All categories menu */}
        <Link
          to="#"
          className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition flex items-center"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All
          </span>
        </Link>
        
        {/* Main category links - now using actual Link components */}
        {categories.map((cat) => (
          <Link
            to={cat.href}
            key={cat.name}
            className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition"
          >
            {cat.name}
          </Link>
        ))}
        
        {/* Additional Amazon-like categories with proper links */}
        <Link to="/deals" className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition">Today's Deals</Link>
        <Link to="/contact-us" className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition">Customer Service</Link>
        <Link to="/registry" className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition">Registry</Link>
        <Link to="/gift-cards" className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition">Gift Cards</Link>
        <Link to="/sell" className="font-bold text-sm text-white hover:text-brandiaga-yellow-400 whitespace-nowrap transition">Sell</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
