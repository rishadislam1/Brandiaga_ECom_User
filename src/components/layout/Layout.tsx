
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatButton from "../chat/ChatButton";
import BrandiagaWatermark from "../BrandiagaWatermark";
import React from "react";

// Only show Logo Watermark on specific routes
const useWhiteBg = () => {
  const { pathname } = useLocation();
  return [
    "/signin",
    "/signup",
    "/",
    "/orders",
    "/cart",
    "/admin"
    // add more routes as you add more "white background" pages
  ].includes(pathname);
};

const Layout = () => {
  const showWatermark = useWhiteBg();
  return (
    <div className="flex min-h-screen flex-col bg-white bg-opacity-5">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatButton />
      {showWatermark && <BrandiagaWatermark />}
    </div>
  );
};

export default Layout;
