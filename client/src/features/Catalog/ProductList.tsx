import { Grid2 } from "@mui/material";
import Product from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  let renderedProduct = products.map((product) => {
    return (
      <Grid2 size={3} key={product.id}>
        <ProductCard product={product} />
      </Grid2>
    );
  });

  return (
    <Grid2 container spacing={4}>
      {renderedProduct}
    </Grid2>
  );
}
