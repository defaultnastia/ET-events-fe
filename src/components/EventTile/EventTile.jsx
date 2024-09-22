import dayjs from "dayjs";
import css from "./EventTile.module.css";
import { NavLink } from "react-router-dom";

const EventTile = ({ event }) => {
  const { _id, title, description, eventDate, organizer } = event;

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
        <NavLink
          className="cta"
          to={`/${_id}/createGuest`}
          state={{ eventId: _id, title }}
        >
          Register
        </NavLink>
        <NavLink
          className="cta"
          to={`/${_id}/guests`}
          state={{ eventId: _id, title }}
        >
          View Guests
        </NavLink>
      </div>
    </div>
  );
};

export default EventTile;
