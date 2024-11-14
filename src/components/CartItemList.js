import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  updateItemQuantity,
} from "../store/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const CartItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            boxShadow: "none",
          },
        }}
      />
      <ul className="space-y-4">
        {items.map((cartItem) => (
          <li
            key={cartItem.item.id}
            className="flex gap-4 justify-between max-w-[600px] my-4 border-b-2 border-dashed border-gray-300 pb-4"
          >
            <div className="basis-3/12">
              <img
                className="w-full h-full md:h-auto object-cover block rounded-md aspect-square"
                src={cartItem.item.thumbnail}
                alt={cartItem.item.name || "Image Not Found"}
              />
            </div>
            <div className="basis-9/12">
              <p className="text-lg font-semibold">{cartItem.item.title}</p>
              <p className="text-gray-500 text-sm mt-1 truncate max-w-[400px] hidden md:block">
                {cartItem.item.description}
              </p>
              <p className="text-gray-600">Price: ${cartItem.item.price}</p>

              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() =>
                    dispatch(decreaseItemQuantity({ id: cartItem.item.id }))
                  }
                  disabled={cartItem.quantity === 1}
                  className={`bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 rounded ${
                    cartItem.quantity === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  -
                </button>

                <input
                  type="number"
                  min="1"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleQuantityChange(cartItem.item.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 w-16 text-center"
                />
                <button
                  onClick={() =>
                    dispatch(increaseItemQuantity({ id: cartItem.item.id }))
                  }
                  className="bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => {
                    dispatch(removeFromCart({ id: cartItem.item.id }));
                    toast.success("Item removed successfully");
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CartItemList;
