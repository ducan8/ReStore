// import { useState, useEffect } from "react";
// import Product from "../../app/models/product";
// import agent from "../../app/api/agent";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  fetchFilters,
  fetchProductsAsync,
  productsSelector,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to hight" },
];

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
  const {
    productsLoaded,
    productParams,
    status,
    filtersLoaded,
    brands,
    types,
    metaData,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  // if (status.includes("pending") || !metaData)
  //   return <LoadingComponent message="Loading products..." />;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 3 }}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 9 }}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid size={{ xs: 3 }} />
      <Grid size={{ xs: 9 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => {
              dispatch(setPageNumber({ pageNumber: page }));
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
