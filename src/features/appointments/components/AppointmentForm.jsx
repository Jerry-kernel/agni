import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Chip,
  Stack,
  Grid,
  InputLabel
} from "@mui/material";



const doctors = [
  "Dr. Smith",
  "Dr. Lee",
  "Dr. John"
];

const pets = [
  { label: "Dog", icon: "🐶" },
  { label: "Cat", icon: "🐱" },
  { label: "Parrot", icon: "🦜" },
  { label: "Rabbit", icon: "🐰" }
];

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i}:00`);
  }
  return slots;
};




const timeSlots = generateTimeSlots();

const AppointmentForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    ownerName: "",
    petName: "",
    petType: "",
    doctor: "",
    date: "",
    time: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      status: "Scheduled",
      id: Date.now()
    };

    onSubmit(data);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        borderRadius: 4
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Veterinary Appointment
      </Typography>

      <Typography color="text.secondary" mb={2}>
        Book a consultation for your pet
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          {/* Owner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Owner Name"
              name="ownerName"
              fullWidth
              value={form.ownerName}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Pet Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Pet Name"
              name="petName"
              fullWidth
              value={form.petName}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Pet Type */}
          <Grid size={12}>
            <Typography variant="subtitle2" mb={1}>
              Pet Type
            </Typography>

            <Stack direction="row" spacing={1}>
              {pets.map((pet) => (
                <Chip
                  key={pet.label}
                  label={`${pet.icon} ${pet.label}`}
                  clickable
                  color={
                    form.petType === pet.label
                      ? "primary"
                      : "default"
                  }
                  onClick={() =>
                    setForm({
                      ...form,
                      petType: pet.label
                    })
                  }
                />
              ))}
            </Stack>
          </Grid>

          {/* Doctor */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Doctor"
              name="doctor"
              fullWidth
              value={form.doctor}
              onChange={handleChange}
              required
            >
              {doctors.map((doc) => (
                <MenuItem key={doc} value={doc}>
                  {doc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Date */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              type="date"
              label="Appointment Date"
              name="date"
              fullWidth
              slotProps={{ 
                inputLabel:{
                shrink: true} }}
              value={form.date}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Time */}
         <Grid size={12}>
  <Typography variant="subtitle2" mb={1}>
    Select Time Slot
  </Typography>

        <Grid container spacing={1.5}>
            {timeSlots.map((slot) => (
            <Grid key={slot} size={{ xs: 6, sm: 4, md: 3 }}>
                <Button
                fullWidth
                variant={form.time === slot ? "contained" : "outlined"}
                onClick={() =>
                    setForm({
                    ...form,
                    time: slot
                    })
                }
                sx={{
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 500
                }}
                >
                {slot}
                </Button>
            </Grid>
            ))}
        </Grid>
        </Grid>

          {/* Reason */}
          <Grid size={12}>
            <TextField
              label="Reason for Visit"
              name="reason"
              multiline
              rows={4}
              fullWidth
              value={form.reason}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit */}
          <Grid size={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography color="text.secondary">
                Consultation duration: 1 hour
              </Typography>

              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  px: 4,
                  borderRadius: 2
                }}
              >
                Book Appointment
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
};

export default AppointmentForm;