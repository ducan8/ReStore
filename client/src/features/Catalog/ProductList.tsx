import { Grid2 } from "@mui/material";
import Product from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  let renderedProduct = products.map((product) => {
    return (
      <Grid2 size={3} key={product.id}>
        {!productsLoaded ? (
          <ProductCardSkeleton />
        ) : (
          <ProductCard product={product} />
        )}
      </Grid2>
    );
  });

  return (
    <Grid2 container spacing={4}>
      {renderedProduct}
    </Grid2>
  );
}
