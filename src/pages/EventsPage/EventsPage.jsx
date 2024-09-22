import { useCallback, useEffect, useRef, useState } from "react";
import css from "./EventsPage.module.css";
import { getAllEvents } from "../../services/eventsAPI";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import EventsList from "../../components/EventsList/EventsList";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limitPerPage = 8;
  const observer = useRef();

  const loadEvents = async () => {
    try {
      setLoader(true);
      setError(null);

      const { total, results } = await getAllEvents({
        page,
        limit: limitPerPage,
      });

      setEvents((prevEvents) => [...prevEvents, ...results]);
      setTotal(total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [page]);

  const lastEventElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (total / limitPerPage < page) return;
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loader]
  );

  useEffect(() => {
    if (!error) return;
    toast.error(`Something went wrong: ${error}`);
  }, [error]);

  return (
    <div>
      {loader && <Loader />}
      {!!events.length && (
        <EventsList events={events} lastEventElementRef={lastEventElementRef} />
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
