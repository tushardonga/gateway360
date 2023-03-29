import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <div className="p-8">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
