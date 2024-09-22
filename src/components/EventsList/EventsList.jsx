import EventTile from "../EventTile/EventTile";
import css from "./EventsList.module.css";

const EventsList = ({ events, lastEventElementRef }) => {
  return (
    <ul className={css.list}>
      {events.map((event, index) => (
        <li
          key={event._id}
          ref={events.length === index + 1 ? lastEventElementRef : null}
        >
          <EventTile event={event}></EventTile>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
