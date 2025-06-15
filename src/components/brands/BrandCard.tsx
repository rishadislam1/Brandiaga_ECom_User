
import { Link } from "react-router-dom";

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    logo: string;
    productCount: number;
  };
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <Link 
      to={`/products?brand=${brand.name.toLowerCase()}`}
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center group"
    >
      <div className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full border-2 border-gray-200 group-hover:border-brandiaga-yellow-400 transition-colors">
        <img 
          src={brand.logo} 
          alt={brand.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop";
          }}
        />
      </div>
      <h3 className="font-medium text-gray-900 group-hover:text-brandiaga-yellow-600 transition-colors">
        {brand.name}
      </h3>
      <p className="text-sm text-gray-500">{brand.productCount} products</p>
    </Link>
  );
};

export default BrandCard;
