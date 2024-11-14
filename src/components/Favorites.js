import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites, clearFavorites } from "../store/favoritesSlice";
import { addToCart } from "../store/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites({ id }));
    toast.success("Item Removed From Favorites!");
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to Cart!");
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    toast.success("All Items Removed From Favorites!");
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
      <div className="flex items-start justify-center min-h-screen p-4">
        <div className="container max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
            {favoriteItems.length > 0 && (
              <button
                onClick={handleClearFavorites}
                className=" bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200  block"
              >
                Clear Favorites
              </button>
            )}
          </div>

          {favoriteItems.length === 0 ? (
            <p className="text-center">Your favorites list is empty.</p>
          ) : (
            <>
              <ul className="space-y-4 mx-auto">
                {favoriteItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 justify-between items-start max-w-[600px] my-4 border-b-2 border-dashed border-gray-300 pb-4"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-28 h-28 rounded-md"
                    />
                    <div className="flex flex-col flex-grow">
                      <h2 className="font-bold text-lg">{item.title}</h2>
                      <p className="text-gray-600 hidden md:block">
                        {item.description}
                      </p>
                      <p className="font-semibold mt-2">Price: ${item.price}</p>

                      <div className="flex mt-2 space-x-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-orange-400 text-white py-1 px-3 rounded-md hover:bg-orange-600 transition-colors duration-200 w-full sm:w-auto"
                        >
                          Add to Cart
                        </button>

                        <button
                          onClick={() => handleRemoveFavorite(item.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
