
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const MobileAccountButton = () => {
  return (
    <Link to="/signin" className="text-white flex items-center py-1 px-2">
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-300">Sign in</span>
        <span className="text-xs flex items-center">
          <User className="h-4 w-4 mr-1" />
          Account
        </span>
      </div>
    </Link>
  );
};

export default MobileAccountButton;
