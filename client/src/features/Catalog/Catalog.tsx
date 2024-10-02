import { useState, useEffect } from "react";
import Product from "../../app/models/product";
import ProductList from "./ProductLitst";

export default function Catalog() {
  let [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5285/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
