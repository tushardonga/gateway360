import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-6 fixed inset-x-0 bottom-0">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2023. All Rights Reserved. Made with{" "}
          <span className="text-red-500">&hearts;</span> by Me.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
