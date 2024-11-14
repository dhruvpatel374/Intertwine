import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const cartItem = useSelector((store) => store.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  return (
    <nav className="sticky top-0 z-50 bg-white flex justify-between px-8 items-center py-6 shadow-sm">
      <section className="flex items-center gap-4">
        <p className="text-3xl font-mono">
          <Link to="/">Intertwine</Link>
        </p>
      </section>
      <div className="hidden lg:block">
        <ul className="flex gap-4 items-center text-zinc-700">
          <li>
            <Link
              to="/"
              className="p-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-gray-700" /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="p-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <BuildingOfficeIcon className="w-4 h-4 text-gray-700" /> Contact
              Us
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/favorites"
              className="p-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HeartIcon className="w-4 h-4 text-gray-700" /> Favorites
              <span className="absolute top-[-10px] right-[-10px] bg-orange-400 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                {favoriteItems.length}
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/cart"
              className="p-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4 text-gray-700" /> Cart
              <span className="absolute top-[-10px] right-[-10px] bg-orange-400 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                {cartItem.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <Bars3Icon
        onClick={() => setMenu(true)}
        className="w-8 h-8 cursor-pointer lg:hidden"
      />
      {/* Menu for mobile */}
      <div
        onClick={() => setMenu(false)}
        className={clsx(
          "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 left-0 -translate-x-full transition-all",
          isSideMenuOpen && "translate-x-0"
        )}
      >
        <section
          onClick={(e) => e.stopPropagation()}
          className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-6 gap-8 z-50 flex w-56 items-center"
        >
          <XMarkIcon
            onClick={() => setMenu(false)}
            className="mt-0 mb-2 w-12 h-12 flex cursor-pointer"
          />
          <ul className="gap-4 text-zinc-700">
            <li>
              <Link
                onClick={() => setMenu(false)}
                to="/"
                className="p-4 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
              >
                <HomeIcon className="w-4 h-4 text-gray-700" /> Home
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setMenu(false)}
                to="/contact"
                className="p-4 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
              >
                <BuildingOfficeIcon className="w-4 h-4 text-gray-700" /> Contact
                Us
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/favorites"
                onClick={() => setMenu(false)}
                className="p-2 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
              >
                <HeartIcon className="w-4 h-4 text-gray-700" /> Favorites
                <span className="absolute top-[-10px] right-[0px] bg-orange-400 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                  {favoriteItems.length}
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenu(false)}
                to="/cart"
                className="p-4 px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
              >
                <ShoppingBagIcon className="w-4 h-4 text-gray-700" /> Cart
                <span className="absolute top-[16.5rem] right-20 bg-orange-400 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                  {cartItem.length}
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default Header;
