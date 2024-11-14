import React from "react";
import toast, { Toaster } from "react-hot-toast";

const OrderSummary = ({
  totalPrice,
  discount,
  deliveryCharge,
  finalAmount,
  itemCount,
}) => {
  return (
    <>
      <Toaster />
      <div className="basis-5/12 h-fit sticky top-40 p-8 rounded-md border shadow-md my-8 md:my-8">
        <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <p className="font-normal">Price ({itemCount} items)</p>
            <p>$ {totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <p className="font-normal">Discount (10%)</p>
            <p>- $ {discount}</p>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <p className="font-normal">Delivery charges (5%)</p>
            <p>+ $ {deliveryCharge}</p>
          </div>

          <p className="text-sm my-2">
            You'll save ${discount} on this order 🎉
          </p>
        </div>

        <div className="py-4 border-b">
          <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl">
            <h1>Total Amount</h1>
            <h1 className="text-orange-400">$ {finalAmount}</h1>
          </div>
        </div>

        <button
          onClick={() => toast.success("Order Placed Successfully")}
          className="w-full block mt-4 uppercase font-bold text-lg bg-orange-400 text-white text-center p-4 rounded-md"
        >
          Place order
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
