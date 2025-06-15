
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ 
  size = "medium", 
  color = "text-brandiaga-yellow-400",
  fullScreen = true
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-16 w-16", 
    large: "h-24 w-24"
  };

  const spinnerContent = (
    <div className="relative">
      <img 
        src="/lovable-uploads/163a4508-5c59-4889-8599-815d06c9c067.png"
        alt="Loading"
        className={cn(
          sizeClasses[size],
          "animate-[spin_2s_linear_infinite_reverse]" // Counter-clockwise spin
        )}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white/90 fixed top-0 left-0 z-50">
        <div className="flex flex-col items-center">
          {spinnerContent}
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
