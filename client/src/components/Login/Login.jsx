import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";

export default function Login() {
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      await axios.post("/app/user/login", data, {
        withCredentials: true,
      });
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2000);
    }
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      {formError ? (
        <Alert severity="error">There was an error logging in!</Alert>
      ) : null}
      {formSuccess ? <Alert severity="success">User logged in!</Alert> : null}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                name="username"
                type="username"
                id="username"
                required={true}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                required={true}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
