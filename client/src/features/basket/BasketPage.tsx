import {
  Box,
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
// import { useStoreContext } from "../../app/context/StoreContext";
// import { useState } from "react";
// import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BacketSummary";
import { formatCurrency } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
// import { removeItem, setBasket } from "./basketSlice";

function BasketPage() {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: "",
  // });

  // function handleAddItem(productId: number, name: string) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: true, name: "" }));
  // }

  // function handleRemoveItem(productId: number, quantity = 1, name = "") {
  //   setStatus({ loading: true, name });
  //   agent.Basket.removeItem(productId, quantity)
  //     .then(() => {
  //       dispatch(removeItem({ productId, quantity }));
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: true, name: "" }));
  // }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      // status.loading && status.name == "rem" + item.productId
                      status.includes(
                        "pendingRemoveItem" + item?.productId + "rem"
                      )
                    }
                    onClick={() =>
                      // handleRemoveItem(
                      //   item.productId,
                      //   1,
                      //   "rem" + item.productId
                      // )
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      // status.loading && status.name == "add" + item.productId
                      status === "pendingAddItem" + item.productId
                    }
                    onClick={() =>
                      // handleAddItem(item.productId, "add" + item.productId)
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price, item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      // status.loading && status.name == "del" + item.productId
                      status.includes(
                        "pendingRemoveItem" + item.productId + "del"
                      )
                    }
                    onClick={() =>
                      // handleRemoveItem(
                      //   item.productId,
                      //   item.quantity,
                      //   "del" + item.productId
                      // )
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2 container sx={{ my: 4 }}>
        <Grid2 size={{ xs: 6 }} />
        <Grid2 size={{ xs: 6 }}>
          <BasketSummary />
          <Button fullWidth variant="contained" component={Link} to="/checkout">
            Checkout
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}

export default BasketPage;
