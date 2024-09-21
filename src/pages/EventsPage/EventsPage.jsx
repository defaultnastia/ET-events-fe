import { useEffect, useState } from "react";
import css from "./EventsPage.module.css";
import EventTile from "../../components/EventTile/EventTile";
import { getAllEvents } from "../../services/eventsAPI";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoader(true);
        setError(null);
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(`Something went wrong: ${error}`);
  }, [error]);

  return (
    <div>
      {loader && Loader}
      {!!events.length && (
        <ul className={css.list}>
          {events.map((event) => {
            return (
              <li key={events.id}>
                <EventTile event={event}></EventTile>
              </li>
            );
          })}
        </ul>
      )}
      {!events.length && (
        <p className={css.message}>
          Sorry, there are no events to display at the moment.
        </p>
      )}
    </div>
  );
};

export default EventsPage;
