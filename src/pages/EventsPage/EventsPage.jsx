import { useCallback, useEffect, useRef, useState } from "react";
import css from "./EventsPage.module.css";
import { getAllEvents } from "../../services/eventsAPI";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import EventsList from "../../components/EventsList/EventsList";
import EventsSortInput from "../../components/EventsSortInput/EventsSortInput";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [sortField, setSortField] = useState("eventDate");
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
        sort: sortField,
      });

      if (page > 1) {
        setEvents((prevEvents) => [...prevEvents, ...results]);
      }

      if (page === 1) {
        setEvents(results);
      }

      setTotal(total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [page, sortField]);

  // === INFINITE SCROLL ===

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

  // === ERROR ===

  useEffect(() => {
    if (!error) return;
    toast.error(`Something went wrong: ${error}`);
  }, [error]);

  // === RENDER ===

  return (
    <div>
      {loader && <Loader />}
      {!!events.length && (
        <EventsSortInput
          setSortField={setSortField}
          sortField={sortField}
          setPage={setPage}
        />
      )}
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
