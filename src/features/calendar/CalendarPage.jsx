import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const CalendarPage = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: "1", title: "Patient Checkup", date: "2025-02-10", color: "#4caf50" },
    { id: "2", title: "Doctor Meeting", date: "2025-02-12", color: "#2196f3" },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    category: "",
  });

  const categories = [
    { label: "Appointment", color: "#4caf50" },
    { label: "Surgery", color: "#f44336" },
    { label: "Meeting", color: "#2196f3" },
    { label: "Personal", color: "#9c27b0" },
    { label: "Holiday", color: "#ff9800" },
  ];

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, date: arg.dateStr });
    setOpen(true);
  };

  const handleAddEvent = () => {
    const selectedCategory = categories.find((c) => c.label === newEvent.category);

    setEvents([
      ...events,
      {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        color: selectedCategory.color,
      },
    ]);

    setOpen(false);
    setNewEvent({ title: "", date: "", category: "" });
  };

  return (
    <Box sx={{ p: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="80vh"
        events={events}
        dateClick={handleDateClick}
      />

      {/* Add Event Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Calendar Event</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Category"
            select
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            fullWidth
          >
            {categories.map((c) => (
              <MenuItem key={c.label} value={c.label}>
                {c.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
