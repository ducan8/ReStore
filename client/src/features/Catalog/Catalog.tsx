// import { useState, useEffect } from "react";
// import Product from "../../app/models/product";
// import agent from "../../app/api/agent";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsync, productsSelector } from "./catalogSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((data) => setProducts(data))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const products = useAppSelector(productsSelector.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
