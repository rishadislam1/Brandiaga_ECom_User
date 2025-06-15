
import { ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{
    title: string;
    items: Array<{ name: string; href: string; }>;
  }>;
}

const MobileSideMenu = ({ isOpen, onClose, categories }: MobileSideMenuProps) => {
  if (!isOpen) return null;

  // Define menu sections to match desktop version
  const menuSections = [
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="absolute top-0 left-0 h-full w-[85%] max-w-[365px] bg-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/d8574f1a-1fd7-4fd9-868c-e4db96b4d1b2.png"
              alt="Logo"
              className="h-8 w-8"
              draggable={false}
            />
            <span className="text-brandiaga-yellow-400 text-xl font-bold animate-blink">Brandiaga</span>
          </div>
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Sections */}
        <div className="py-2">
          {menuSections.map((section) => (
            <div key={section.title} className="border-b border-gray-200">
              <div className="px-6 py-3 font-bold text-lg text-[#111] bg-gray-100">
                {section.title}
              </div>
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-between px-6 py-3 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-[#111]">{item.name}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;
