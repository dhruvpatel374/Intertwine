import { useState } from "react";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/favoritesSlice.js";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ productData }) => {
  const { id, title, price, thumbnail, description, rating } = productData;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const dispatch = useDispatch();

  const handleAddItem = (productData) => {
    dispatch(addToCart(productData));
    toast.success("Added to cart!");
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    if (isFavorite) {
      dispatch(removeFromFavorites({ id }));
      toast.success("Removed from favorites!");
    } else {
      dispatch(addToFavorites(productData));
      toast.success("Added to favorites!");
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
      <div className="cursor-pointer border rounded-lg shadow-lg hover:scale-95 transition ease-in-out duration-300">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <span></span>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-gray-700 font-semibold">${price}</p>
          <p
            className={`text-gray-600 text-sm ${
              isShowDescription ? "" : "truncate"
            }`}
            onClick={() => setIsShowDescription(!isShowDescription)}
          >
            {description}
          </p>

          <button
            onClick={() => setIsShowDescription(!isShowDescription)}
            className="text-blue-500 text-sm mt-1"
          >
            {isShowDescription ? "Show Less" : "Show More"}
          </button>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-orange-400" />
              <p className="font-bold text-gray-700 ml-1">{rating || "N/A"}</p>
            </div>

            <button
              onClick={toggleFavorite}
              className="p-1 rounded-md transition-colors duration-200"
            >
              <HeartIcon
                className={`w-6 h-6 ${
                  isFavorite ? "text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            className="bg-orange-400 text-white py-1 px-3 rounded-md hover:bg-orange-500 transition-colors duration-200 mt-2 w-full"
            onClick={() => handleAddItem(productData)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
