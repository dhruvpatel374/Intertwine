import React from "react";

import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";

import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Favorites from "./components/Favorites";
const AppLayout = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Header />

        <Outlet />

        <Footer />
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },

      { path: "/contact", element: <ContactUs /> },

      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
