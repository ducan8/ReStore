import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
// import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";

interface Props {
  onChangeTheme: () => void;
}

const midLinks = [
  { title: "About", path: "about" },
  { title: "Catalog", path: "catalog" },
  { title: "Contact", path: "contact" },
];

const rightLinks = [
  { title: "Login", path: "login" },
  { title: "Register", path: "register" },
  { title: "Logout", path: "logout" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ onChangeTheme }: Props) {
  // const { basket } = useStoreContext();
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            Re-Store
          </Typography>
          <Switch onClick={onChangeTheme} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map((link) => {
            return (
              <ListItem
                component={NavLink}
                to={link.path}
                key={link.path}
                sx={navStyles}
              >
                {link.title.toUpperCase()}
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ display: "flex" }}>
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map((link) => {
              return (
                <ListItem
                  component={NavLink}
                  to={link.path}
                  key={link.path}
                  sx={navStyles}
                >
                  {link.title.toUpperCase()}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
