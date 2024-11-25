import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ContactPage from "../features/contact/ContactPage";
import App from "../app/layout/App";
import ServerError from "../app/errors/ServerError";
import NotFound from "../app/errors/NotFound";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import AboutPage from "../features/about/ErrorPage";
import BasketPage from "../features/basket/BasketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
