import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  onChangeTheme: () => void;
}

export default function Header({ onChangeTheme }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Switch onClick={onChangeTheme} />
      </Toolbar>
    </AppBar>
  );
}
