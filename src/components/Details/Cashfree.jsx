import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import Layout from "../Layout/Layout";

const iframeStyles = {
  base: {
    color: "#fff",
    fontSize: "16px",
    iconColor: "#fff",
    "::placeholder": {
      color: "#87bbfd",
    },
  },
  invalid: {
    iconColor: "#FFC7EE",
    color: "#FFC7EE",
  },
  complete: {
    iconColor: "#cbf4c9",
  },
};

const cardElementOpts = {
  iconStyle: "solid",
  style: iframeStyles,
  hidePostalCode: true,
};

const Cashfree = () => {
  const elements = useElements();

  return (
    <Layout>
      <div className="w-full d-flex flex-col min-h-full p-8">
        <div className="w-full flex justify-center py-4 underline font-mono">
          <h1 className="text-3xl font-bold">Stripe Demo</h1>
        </div>
        <div className="w-full mx-auto bg-gradient-to-r from-sky-200  to-sky-100 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex justify-between">
            <div className="md:flex-shrink-0 p-4">
              <img
                className="h-48 w-full object-cover md:w-48"
                src="https://via.placeholder.com/150"
                alt="Order"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-gray-500 font-semibold">
                Order #12345
              </div>
              <h3 className="mt-2 text-xl font-bold text-gray-900">
                Your Order Summary
              </h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Subtotal</div>
                  <div className="text-gray-900">$100.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Tax</div>
                  <div className="text-gray-900">$10.00</div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                  <div className="text-gray-600 font-bold">Total</div>
                  <div className="text-gray-900 font-bold">$110.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex justify-between">
          <div className="p-8 bg-gradient-to-r from-sky-200  to-sky-100 max-w-md rounded-xl overflow-hidden shadow-md">
            <h3 className="text-3xl font-bold text-gray-900">
              Contact Information
            </h3>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="w-6 h-6 text-gray-700 mr-2">
                  <i className="far fa-user"></i>
                </div>
                <div className="text-gray-700 font-semibold">John Doe</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-6 h-6 text-gray-700 mr-2">
                  <i className="far fa-envelope"></i>
                </div>
                <div className="text-gray-700 font-semibold">
                  johndoe@gmail.com
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-6 h-6 text-gray-700 mr-2">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="text-gray-700 font-semibold">
                  (123) 456-7890
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-6 h-6 text-gray-700 mr-2">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="text-gray-700 font-semibold">
                  1234 Main Street
                  <br />
                  Anytown, ST 12345
                </div>
              </div>
            </div>
          </div>
          <div className="self-end">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cashfree;

export function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

export const CheckoutForm = () => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const cardElement = elements.getElement("card");

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value,
      },
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }),
    };

    try {
      let { data: clientSecret } = await fetch("url", requestOptions);
      clientSecret = JSON.parse(clientSecret);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      //perform the action which you want to perform on successfull payement
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  <form onSubmit={handleFormSubmit}>
    <div className="flex">
      <div className="h-10 flex items-center">
        <CardElement
          options={cardElementOpts}
          onChange={handleCardDetailsChange}
        />
      </div>
    </div>

    <button
      disabled={isProcessing || !stripe}
      className="min-w-[500px]  py-2 border-2 border-sky-200 shadow-md text-sky-900 font-semibold bg-white rounded-lg hover:bg-sky-200 hover:border-sky-200"
    >
      {isProcessing ? "Processing..." : `Pay $${110}`}
    </button>
  </form>;
};
