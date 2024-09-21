import dayjs from "dayjs";
import Button from "../Button/Button";
import css from "./EventTile.module.css";

const EventTile = ({ event }) => {
  const { title, description, eventDate, organizer } = event;

  const onClick = () => {};

  return (
    <div className={css.event}>
      <p className={css.org}>{organizer}&apos;s Event</p>
      <div>
        <h3>{title} </h3>
        <p>{description}</p>
        <p className={css.date}>
          {dayjs(eventDate).format("dddd, MMMM D, YYYY")}
        </p>
      </div>
      <div className={css.tools}>
        <Button btnType="register" onClick={onClick}>
          Register
        </Button>
        <Button btnType="view" onClick={onClick}>
          View Guests
        </Button>
      </div>
    </div>
  );
};

export default EventTile;
