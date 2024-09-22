import { useCallback, useEffect, useRef, useState } from "react";
import css from "./GuestsPage.module.css";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import { getEventGuests } from "../../services/eventsAPI";
import GuestsList from "../../components/GuestsList/GuestsList";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limitPerPage = 10;
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
      });
      setGuests((prevEvents) => [...prevEvents, ...results]);
      setTotal(total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [eventId, page]);

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

      {!!guests.length && (
        <GuestsList guests={guests} lastGuestElementRef={lastGuestElementRef} />
      )}

      {!guests.length && (
        <div className={css.message}>
          <p>
            There are no guests yet. <br /> Be the first one!
          </p>
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
