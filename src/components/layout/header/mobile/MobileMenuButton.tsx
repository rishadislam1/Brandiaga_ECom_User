
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <Button 
      size="icon" 
      variant="ghost" 
      className="text-white mr-2 p-1"
      onClick={onClick}
      aria-label="Menu"
    >
      <Menu className="h-6 w-6 text-brandiaga-yellow-400" />
      <span className="sr-only">All</span>
    </Button>
  );
};

export default MobileMenuButton;
