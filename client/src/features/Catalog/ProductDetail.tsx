import { ChangeEvent, useEffect, useState } from "react";
// import Product from "../../app/models/product";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
// import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  // removeItem,
  // setBasket,
} from "../basket/basketSlice";
import { fetchProductAsync, productsSelector } from "./catalogSlice";

export default function ProductDetail() {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => {
    return productsSelector.selectById(state, +id!);
  });
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  // const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find((i) => i.productId === product?.id);

  // useEffect(() => {
  //   if (item) setQuantity(item.quantity);
  //   id &&
  //     agent.Catalog.details(parseInt(id))
  //       .then((data) => setProduct(data))
  //       .catch((error) => console.log(error))
  //       .finally(() => setLoading(false));
  // }, [id, item]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading product detai..." />;

  if (!product) return <NotFound />;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdateCart() {
    // setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      // agent.Basket.addItem(product!.id, updatedQuantity)
      //   .then((basket) => dispatch(setBasket(basket)))
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));
      dispatch(
        addBasketItemAsync({
          productId: item?.productId!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      // agent.Basket.removeItem(product?.id!, updatedQuantity)
      //   .then(() =>
      //     dispatch(
      //       removeItem({ productId: product?.id!, quantity: updatedQuantity })
      //     )
      //   )
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 6 }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityOnStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <LoadingButton
              loading={status.includes("pending")}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
