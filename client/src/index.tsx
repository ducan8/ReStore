import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes.tsx";
import { StoreProvider } from "./app/context/StoreContext.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore.ts";
import { fetchProductsAsync } from "./features/catalog/catalogSlice.ts";

store.dispatch(fetchProductsAsync());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StoreProvider>
  </StrictMode>
);
