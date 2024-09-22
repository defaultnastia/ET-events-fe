import { useLocation } from "react-router-dom";
import GuestRegistrationForm from "../../components/GuestRegistrationForm/GuestRegistrationForm";
import css from "./CreateGuestPage.module.css";

const CreateGuestPage = () => {
  const location = useLocation();
  const { eventId, title } = location.state;

  return (
    <div>
      <div className={css.header}>
        <h2>{title}</h2>
        <p>Guest Registration</p>
      </div>
      <GuestRegistrationForm eventId={eventId} title={title} />
    </div>
  );
};

export default CreateGuestPage;
