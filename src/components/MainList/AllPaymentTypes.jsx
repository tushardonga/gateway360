import React from "react";
import { geteWays } from "../../data";
import PaymentCard from "../PaymentCard";

const AllPaymentTypes = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {geteWays.map((way) => (
        <PaymentCard way={way} />
      ))}
    </div>
  );
};

export default AllPaymentTypes;
