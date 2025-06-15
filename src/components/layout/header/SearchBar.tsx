
import {useState, FormEvent, useEffect} from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {GetCategoriesRequest} from "@/Request/CategoryRequest.tsx";
import {Link} from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string, category: string) => void;
}



const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        (async ()=>{
            const res = await GetCategoriesRequest();
            setCategories(res.data);
        })();
    }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    if (onSearch) {
      onSearch(searchQuery, selectedCategory);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full h-10">
        <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-[#f3f3f3] text-black border-r border-gray-300 rounded-l-md px-2 text-sm hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f90]"
            aria-label="Select category"
        >
            <option value={'All'}>
                ALL
            </option>
            {categories?.map(cat => (
                <option key={cat.categoryId} value={cat.name}>
                    {cat.name}
                </option>
            ))}
        </select>

        <input
            type="text"
            placeholder="Search Brandiaga"
            className="flex-1 px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f90] text-sm"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        aria-label="Search input"
      />

      <Link to={`/products?category=${selectedCategory}&searchItem=${searchQuery}`}><Button
          type="submit"
          size="icon"
          className="h-full bg-[#f90] hover:bg-[#ff9900] rounded-r-md"
          aria-label="Search"
      >
          <Search className="h-5 w-5 text-black" />
      </Button></Link>
    </form>
  );
};

export default SearchBar;
