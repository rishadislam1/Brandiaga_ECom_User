import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Facebook, Instagram, Twitter} from "lucide-react";
import {GetCategoriesRequest} from "@/Request/CategoryRequest.tsx";
import {UserSubscribe} from "@/Request/AuthRequest.tsx";
import {showSuccess} from "@/components/ToasterComponent";
import {toast} from "@/hooks/use-toast.ts"; // Assumed from Home.jsx

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRes = await GetCategoriesRequest();

                if (categoryRes.data) {
                    setCategories(categoryRes.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsCategoryLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const data={
            email: email
        }
        const res = await UserSubscribe(data);

        if(res){
            toast({
                title: "Subscribed Successfully",
                description: "Thanks for your subscription. You will get the updated news from us.",
            });
            e.target.reset();
        }
    }

    // Fallback categories if API fails or returns no data
    const fallbackCategories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-brandiaga-yellow-400 mb-4">Brandiaga</h3>
                        <p className="text-gray-400 mb-4">
                            The marketplace where premium brands come together to offer you the best shopping
                            experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors">
                                <Facebook/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors">
                                <Instagram/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors">
                                <Twitter/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links (Shop) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            {isCategoryLoading ? (
                                <li className="text-gray-400">Loading categories...</li>
                            ) : categories.length > 0 ? (
                                categories.slice(0, 5).map((category) => (
                                    <li key={category.categoryId}>
                                        <Link
                                            to={`/products?category=${category.slug}`}
                                            className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                fallbackCategories.map((category) => (
                                    <li key={category}>
                                        <Link
                                            to={`/products?category=${category.toLowerCase()}`}
                                            className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors"
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            {['Contact Us', 'FAQ', 'Returns', 'Shipping', 'Track Order'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-brandiaga-yellow-400 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                        <p className="text-gray-400 mb-2">
                            Subscribe to our newsletter for the latest products and offers.
                        </p>
                        <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                name={"email"}
                                placeholder="Your email address"
                                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brandiaga-yellow-400"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-brandiaga-yellow-400 text-gray-900 font-medium rounded-md hover:bg-brandiaga-yellow-500 transition-colors"

                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div
                    className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Brandiaga. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="text-gray-400 hover:text-brandiaga-yellow-400 text-sm">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="text-gray-400 hover:text-brandiaga-yellow-400 text-sm">
                            Terms of Service
                        </Link>
                        <Link to="/seller-policy" className="text-gray-400 hover:text-brandiaga-yellow-400 text-sm">
                            Seller Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;