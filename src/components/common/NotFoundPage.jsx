import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";



const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAF9",
        px: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 420,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "rgba(42,127,111,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 40, }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1A2E22",
            mb: 1,
          }}
        >
          404
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: "1.1rem",
            color: "rgba(26,46,34,0.7)",
            mb: 2,
          }}
        >
          Page not found
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(26,46,34,0.6)",
            mb: 3,
          }}
        >
          The page you're looking for doesn’t exist or has been moved.
        </Typography>

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": { bgcolor: "#1D6258" },
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{

              textTransform: "none",
              fontWeight: 600,
              px: 3,
              "&:hover": {
                borderColor: "#1D6258",
                bgcolor: "rgba(42,127,111,0.05)",
              },
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotFound;