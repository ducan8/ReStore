import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.Errors.getValidationError()
      .then(() => console.log("have no error"))
      .catch((error) => {
        console.log(error);
        setValidationErrors(error);
      });
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Testing Errors
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.Errors.get400Error().catch((error) => console.log(error))
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.Errors.get401Error().catch((error) => console.log(error))
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.Errors.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.Errors.get500Error().catch((error) => console.log(error))
          }
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
