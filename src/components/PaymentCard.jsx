import React from "react";
import { Link } from "react-router-dom";

const PaymentCard = ({ way }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* <img
        src={product?.thumbnail}
        alt={product?.title}
        className="w-full h-48 object-cover"
      /> */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold mb-2">{way.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{way.des}</p>

        <Link to={"/cashfree"}>
          <div className="bg-gray-100 px-4 py-2 rounded-lg md:flex md: justify-center items-center">
            Details
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCard;
