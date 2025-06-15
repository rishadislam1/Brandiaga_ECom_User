import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
import LocationPicker from "./LocationPicker";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { RootState } from '@/redux/store.js';

import {Button} from "@/components/ui/button.tsx";
import {logout} from "@/redux/Slicers/UserSlice.ts";

const DesktopHeader = () => {

  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) =>
      state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const { isAuthenticated, username } = useSelector((state: RootState) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
      <div className="hidden md:flex flex-col w-full">
        {/* Top header */}
        <div className="bg-[#232f3e] flex items-center justify-between w-full gap-4 py-2 px-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                  src="/lovable-uploads/d8574f1a-1fd7-4fd9-868c-e4db96b4d1b2.png"
                  alt="Logo"
                  className="h-12 w-12"
                  draggable={false}
              />
              <span className="text-brandiaga-yellow-400 text-2xl font-bold animate-blink">
              Brandiaga
            </span>
            </Link>

            {/* Deliver to */}
            <LocationPicker />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl">
            <SearchBar />
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4 text-white">
            <div className="relative group">
              {isAuthenticated ? (
                  <div className={`flex justify-center items-center gap-2`}>
                    <div className="hover:text-brandiaga-yellow-400 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-bold">Hello, {username || 'User'}</span>
                      </div>
                    </div>
                    <div className="absolute hidden group-hover:block bg-white text-black border border-gray-200 rounded-md mt-32 w-48">
                      <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Your Account</Link>
                      <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>

                  </div>
              ) : (
                  <Link to="/signin" className="hover:text-brandiaga-yellow-400">
                    <div className="flex flex-col">
                      <Button>SignIn</Button>

                    </div>
                  </Link>
              )}
            </div>
            {isAuthenticated &&
                <Link to="/orders" className="hover:text-brandiaga-yellow-400">
              <div className="flex flex-col">
                <span className="font-bold">Returns</span>
                <span className="font-bold">& Orders</span>
              </div>
            </Link>}

            <Link to="/cart" className="flex items-end hover:text-brandiaga-yellow-400">
              <div className="relative">
                <ShoppingCart className="h-8 w-8" />
                {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brandiaga-yellow-400 text-xs font-medium text-black">
                  {cartCount}
                </span>
                )}
              </div>
              <span className="font-bold ml-1">Cart</span>
            </Link>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="bg-[#232f3e] border-t border-gray-700 px-4 py-2">
          <nav className="flex items-center gap-6 text-white">
            <Menubar className="bg-transparent border-none p-0">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-1 hover:text-brandiaga-yellow-400 bg-transparent text-white focus:bg-transparent focus:text-white px-0 data-[state=open]:bg-transparent cursor-pointer">
                  <Menu className="h-6 w-6" />
                  <span className="font-bold text-brandiaga-yellow-400">All</span>
                </MenubarTrigger>
                <MenubarContent className="w-64 bg-white text-black border border-gray-200">
                  <div className="py-2">
                    {/* Trending Section */}
                    <div className="px-3 py-1.5 font-bold bg-gray-100">Trending</div>
                    <MenubarItem>
                      <Link to="/trending/best-sellers" className="w-full">Best Sellers</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/trending/new-releases" className="w-full">New Releases</Link>
                    </MenubarItem>
                    <MenubarSeparator />

                    {/* Shop by Department */}
                    <div className="px-3 py-1.5 font-bold bg-gray-100">Shop by Department</div>
                    <MenubarItem>
                      <Link to="/electronics" className="w-full">Electronics</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/computers" className="w-full">Computers</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/smart-home" className="w-full">Smart Home</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/arts-crafts" className="w-full">Arts & Crafts</Link>
                    </MenubarItem>
                    <MenubarSeparator />

                    {/* Programs & Features */}
                    <div className="px-3 py-1.5 font-bold bg-gray-100">Programs & Features</div>
                    <MenubarItem>
                      <Link to="/gift-cards" className="w-full">Gift Cards</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/shop-by-interest" className="w-full">Shop By Interest</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/brandiaga-live" className="w-full">Brandiaga Live</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/international-shopping" className="w-full">International Shopping</Link>
                    </MenubarItem>
                    <MenubarSeparator />

                    {/* Help & Settings */}
                    <div className="px-3 py-1.5 font-bold bg-gray-100">Help & Settings</div>
                    <MenubarItem>
                      <Link to="/account" className="w-full">Your Account</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/customer-service" className="w-full">Customer Service</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/admin" className="w-full">Admin Panel</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/language" className="w-full">English</Link>
                    </MenubarItem>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Link to="/today-deals" className="hover:text-brandiaga-yellow-400">Today's Deals</Link>
            <Link to="/customer-service" className="hover:text-brandiaga-yellow-400">Customer Service</Link>
            <Link to="/registry" className="hover:text-brandiaga-yellow-400">Registry</Link>
            <Link to="/gift-cards" className="hover:text-brandiaga-yellow-400">Gift Cards</Link>
            <Link to="/sell" className="hover:text-brandiaga-yellow-400">Sell</Link>
          </nav>
        </div>
      </div>
  );
};

export default DesktopHeader;