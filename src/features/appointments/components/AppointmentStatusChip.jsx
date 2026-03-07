import { Chip } from "@mui/material";

const statusColor = {
  Scheduled: "default",
  Confirmed: "primary",
  Completed: "success",
  Cancelled: "error",
};

const AppointmentStatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColor[status] || "default"}
      size="small"
    />
  );
};

export default AppointmentStatusChip;