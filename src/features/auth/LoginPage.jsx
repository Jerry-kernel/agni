import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Paper,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        {/* Avatar + Title */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <Lock />
          </Avatar>
        </Box>

        <Typography variant="h5" align="center" mb={3}>
          Login
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {/* Links */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/forgot-password" underline="hover">
            Forgot password?
          </Link>
          <Link href="/signup" underline="hover">
            Sign up
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
