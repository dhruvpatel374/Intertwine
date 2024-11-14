import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import CartItemList from "./CartItemList";
import OrderSummary from "./OrderSummary";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [cartCleared, setCartCleared] = useState(false);

  const totalPrice = items.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.quantity;
  }, 0);

  const deliveryCharge = (totalPrice * 0.05).toFixed(2);
  const discount = (totalPrice * 0.1).toFixed(2);
  const finalAmount = (
    totalPrice +
    parseFloat(deliveryCharge) -
    parseFloat(discount)
  ).toFixed(2);

  const handleClearCart = () => {
    dispatch(clearCart());
    setCartCleared(true);
  };

  useEffect(() => {
    if (cartCleared) {
      toast.success("All Items Removed From Cart!");
      setCartCleared(false);
    }

    return () => {
      setCartCleared(false);
    };
  }, [cartCleared]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            boxShadow: "none",
          },
        }}
      />
      <div className="flex justify-center items-start min-h-screen py-4 px-4">
        <div className="container max-w-4xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Cart</h1>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-lg"
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="min-h-[60vh] pb-8 lg:flex gap-8">
            {items.length === 0 ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="grid justify-items-center">
                  <CartItemList />
                </div>

                <OrderSummary
                  totalPrice={totalPrice}
                  discount={discount}
                  deliveryCharge={deliveryCharge}
                  finalAmount={finalAmount}
                  itemCount={items.length}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
