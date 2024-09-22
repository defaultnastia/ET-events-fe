import { useEffect, useState } from "react";
import css from "./GuestsPage.module.css";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import { getEventGuest } from "../../services/eventsAPI";
import GuestsList from "../../components/GuestsList/GuestsList";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { eventId, title } = location.state;

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoader(true);
        setError(null);
        const fetchedEvents = await getEventGuest(eventId);
        setGuests(fetchedEvents.result.reverse());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getEvents();
  }, [eventId]);

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

      {!!guests.length && <GuestsList guests={guests} />}

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
