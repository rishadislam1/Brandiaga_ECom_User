
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import SearchBar from "../SearchBar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface MobileSearchToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const MobileSearchToggle = ({ isExpanded, onToggle }: MobileSearchToggleProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "bg-black flex items-center w-full px-3 py-2",
      isExpanded ? "rounded-t-md" : ""
    )}>
      {isExpanded && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className="text-white mr-2"
          aria-label="Back"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex-1">
        {isExpanded ? (
          <div className="w-full">
            <SearchBar onSearch={(query, category) => {
              navigate(`/products?query=${encodeURIComponent(query)}&category=${category}`);
              onToggle();
            }} />
          </div>
        ) : (
          <button 
            onClick={onToggle}
            className="flex items-center w-full h-10 rounded-md bg-gray-800 border border-brandiaga-yellow-400 px-3 text-left text-brandiaga-yellow-400"
            aria-label="Search Brandiaga"
          >
            <Search className="h-5 w-5 text-brandiaga-yellow-400 mr-2" />
            Search Brandiaga
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileSearchToggle;
