import { useEffect, useState } from "react";
import css from "./EventsPage.module.css";
import { getAllEvents } from "../../services/eventsAPI";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import EventsList from "../../components/EventsList/EventsList";

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
        setEvents(fetchedEvents.results);
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
      {loader && <Loader />}
      {!!events.length && <EventsList events={events} />}
      {!events.length && (
        <p className={css.message}>
          Sorry, there are no events to display at the moment.
        </p>
      )}
    </div>
  );
};

export default EventsPage;
