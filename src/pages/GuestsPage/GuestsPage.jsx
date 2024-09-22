import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getEventGuests } from "../../services/eventsAPI";
import Loader from "../../components/Loader/Loader";
import GuestsList from "../../components/GuestsList/GuestsList";
import GuestsSearchForm from "../../components/GuestsSearchForm/GuestsSearchForm";
import css from "./GuestsPage.module.css";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limitPerPage = 3;
  const observer = useRef();

  const location = useLocation();
  const { eventId, title } = location.state;

  const getEvents = async () => {
    try {
      setLoader(true);
      setError(null);
      const { results, total } = await getEventGuests({
        eventId,
        page,
        limit: limitPerPage,
        query,
      });

      if (page > 1) {
        setGuests((prevEvents) => [...prevEvents, ...results]);
      }

      if (page === 1) {
        setGuests(results);
      }
      setTotal(total);
    } catch (error) {
      error.status === 404 ? setGuests([]) : setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [eventId, page, query]);

  const lastGuestElementRef = useCallback(
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

      <div className={css.header}>
        <h2>{title}</h2>
        <p>Registered Guests</p>
      </div>

      <GuestsSearchForm setQuery={setQuery} setPage={setPage} />

      {!!guests.length && (
        <GuestsList guests={guests} lastGuestElementRef={lastGuestElementRef} />
      )}

      {!guests.length && (
        <div className={css.message}>
          <p>
            No guests to show yet. <br /> Clear the filter if applied or be the
            first one!
          </p>

          <button
            className="cta"
            onClick={() => {
              setQuery("");
            }}
          >
            Remove Filters
          </button>

          <NavLink
            className="cta"
            to={`/${eventId}/createGuest`}
            state={{ eventId, title }}
          >
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default GuestsPage;
