import { useNavigate } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";

const AppointmentCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log("Appointment:", data);

    navigate("/appointments");
  };

  return <AppointmentForm onSubmit={handleSubmit} />;
};

export default AppointmentCreate;