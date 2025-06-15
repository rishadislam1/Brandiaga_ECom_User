import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter, Grid2X2, List } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/Slicers/ProductSlice";
import { GetProductsRequest } from "@/Request/ProductRequest.tsx";
import {GetCategoriesRequest} from "@/Request/CategoryRequest.tsx";
import {setCategories} from "@/redux/Slicers/CategorySlice";
import {baseURL} from "@/hooks/UseAxiosSecure";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const brand = queryParams.get('brand');
  const subcategory = queryParams.get('subcategory');
  const searchItem = queryParams.get('searchItem');
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const productsPerPage = 12; // Adjust as needed

  // Title based on query parameters
  let pageTitle = "All Products";
  if (category && category.toLowerCase() !== 'all') pageTitle = `${category} Products`;
  if (subcategory) pageTitle = `${subcategory} Products`;
  if (brand) pageTitle = `${brand} Products`;
  if (searchItem) pageTitle = `Search Results for "${searchItem}"`;

  // use selectors
  // @ts-ignore
  const products = useSelector((state) => state?.products.products); // Assuming ProductSlice stores products in state.products.products
  // @ts-ignore
  const {categories} = useSelector((state)=>state?.categories);
  // Fetch products
  useEffect(() => {
    (async () => {
      const result = await GetProductsRequest();
      if (result?.data) {
        dispatch(setProducts(result.data));
      }
    })();
    (async()=>{
      const result = await GetCategoriesRequest();

      dispatch(setCategories(result.data));
    })();
  }, []);

  // Filter products based on query params and user filters
  useEffect(() => {
    let filtered = [...products];

    // Apply query parameter filters
    if (category && category.toLowerCase() !== 'all') {
      filtered = filtered.filter(product => product.categoryName.toLowerCase() === category.toLowerCase());
    }
    if (brand) {
      filtered = filtered.filter(product => product.brand?.toLowerCase() === brand.toLowerCase());
    }
    if (subcategory) {
      filtered = filtered.filter(product => product.subcategory?.toLowerCase() === subcategory.toLowerCase());
    }
    if (searchItem) {
      filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    // Apply sidebar filters
    if (priceRange.min) {

      filtered = filtered.filter(product => product.discountPrice >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {

      filtered = filtered.filter(product => product.discountPrice <= parseFloat(priceRange.max));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.categoryName));
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => selectedRatings.some(rating => Math.floor(product.rating || 0) >= rating));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, category, brand, subcategory, searchItem, priceRange, selectedCategories, selectedBrands, selectedRatings]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
  );

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
        prev.includes(brand)
            ? prev.filter(b => b !== brand)
            : [...prev, brand]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
        prev.includes(rating)
            ? prev.filter(r => r !== rating)
            : [...prev, rating]
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false); // Close mobile filter panel
  };

  return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

          {/* Filters and sort */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <Button
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            <div className="flex items-center gap-4">
              <div className="bg-white border rounded-lg p-2 flex items-center">
                <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    className={viewMode === 'grid' ? 'bg-brandiaga-yellow-400 text-gray-900' : ''}
                    onClick={() => setViewMode('grid')}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    className={viewMode === 'list' ? 'bg-brandiaga-yellow-400 text-gray-900' : ''}
                    onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <select
                  className="bg-white border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandiaga-yellow-400"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilteredProducts(prev => {
                      const sorted = [...prev];
                      if (value === 'price-low') {
                        return sorted.sort((a, b) => a.price - b.price);
                      } else if (value === 'price-high') {
                        return sorted.sort((a, b) => b.price - a.price);
                      } else if (value === 'rating') {
                        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                      } else if (value === 'newest') {
                        // @ts-ignore
                        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                      }
                      return sorted;
                    });
                  }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar filters (desktop) */}
            <div className={`md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-md p-6 md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                      type="number"
                      placeholder="Min"
                      className="px-3 py-2 border rounded-md w-full"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <input
                      type="number"
                      placeholder="Max"
                      className="px-3 py-2 border rounded-md w-full"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories?.map((cat) => (
                      <div key={cat.categoryId} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`cat-${cat}`}
                            className="mr-2"
                            checked={selectedCategories.includes(cat?.name)}
                            onChange={() => handleCategoryChange(cat?.name)}
                        />
                        <label htmlFor={`cat-${cat?.name}`}>{cat?.name}</label>
                      </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {/*<div className="mb-6">*/}
              {/*  <h3 className="font-medium mb-2">Brands</h3>*/}
              {/*  <div className="space-y-2">*/}
              {/*    {['TechGiant', 'FashionStyle', 'HomeDecor', 'SportLife'].map((b) => (*/}
              {/*        <div key={b} className="flex items-center">*/}
              {/*          <input*/}
              {/*              type="checkbox"*/}
              {/*              id={`brand-${b}`}*/}
              {/*              className="mr-2"*/}
              {/*              checked={selectedBrands.includes(b)}*/}
              {/*              onChange={() => handleBrandChange(b)}*/}
              {/*          />*/}
              {/*          <label htmlFor={`brand-${b}`}>{b}</label>*/}
              {/*        </div>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Ratings</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="mr-2"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => handleRatingChange(rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-brandiaga-yellow-500 ${i < rating ? 'text-opacity-100' : 'text-opacity-30'}`}>★</span>
                          ))}
                          {rating === 1 ? ' & up' : ''}
                        </label>
                      </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                  <div className="text-center text-gray-500 text-lg py-12">
                    No items found.
                  </div>
              ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((product, index) => (
                        <div
                            key={product.productId}
                            className="animate-scale-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <ProductCard
                              product={{
                                id: product.productId,
                                name: product.name,
                                price: product.price,
                                disCountedPrice: product.discountPrice,
                                image: product.imageUrls[0],
                                brand: product.categoryName || 'Unknown',
                                rating: product.rating || 0,
                                reviewCount: product.reviewCount || 0,
                              }}
                          />
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="space-y-4">
                    {paginatedProducts.map((product, index) => (
                        <div
                            key={product.productId}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 p-4">
                              <AspectRatio ratio={3/4} className="bg-gray-100">
                                <img
                                    src={baseURL+product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-md"
                                    loading="lazy"

                                />
                              </AspectRatio>
                            </div>
                            <div className="md:w-3/4 p-4 flex flex-col justify-between">
                              <div>
                                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{product.brand || 'Unknown'}</p>
                                <div className="flex items-center mb-2">
                                  <div className="flex text-brandiaga-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`${i < Math.floor(product.rating || 0) ? 'text-opacity-100' : 'text-opacity-30'}`}>★</span>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
                                </div>
                                <p className="text-gray-700 mb-4">
                                  {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.'}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>

                                  <span
                                      className="font-bold text-xl ">${(product?.discountPrice || "").toFixed(2)}</span>
                                  <s
                                      className="font-bold text-xl ml-5">${(product.price).toFixed(2)}</s>
                                </div>
                                <Button className="bg-brandiaga-yellow-400 hover:bg-brandiaga-yellow-500 text-gray-900">
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-1">
                      <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                              key={page}
                              variant={page === currentPage ? "default" : "outline"}
                              size="sm"
                              className={page === currentPage ? "bg-brandiaga-yellow-400 text-gray-900" : ""}
                              onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                      ))}
                      <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Products;