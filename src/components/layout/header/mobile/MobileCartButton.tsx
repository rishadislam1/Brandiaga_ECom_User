
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileCartButtonProps {
  cartCount: number;
}

const MobileCartButton = ({ cartCount = 0 }: MobileCartButtonProps) => {
  return (
    <Link to="/cart" className="text-white py-1">
      <div className="relative">
        <ShoppingCart className="h-6 w-6 text-white" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brandiaga-yellow-400 text-xs font-medium text-gray-900">
          {cartCount}
        </span>
      </div>
    </Link>
  );
};

export default MobileCartButton;
