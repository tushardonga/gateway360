import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="m-0 p-0 bg-gray-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
