import EventTile from "../EventTile/EventTile";
import css from "./EventsList.module.css";

const EventsList = ({ events }) => {
  return (
    <ul className={css.list}>
      {events.map((event) => (
        <li key={event._id}>
          <EventTile event={event}></EventTile>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
