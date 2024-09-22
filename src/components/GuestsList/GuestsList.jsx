import GuestTile from "../GuestTile/GuestTile";
import css from "./GuestsList.module.css";

const GuestsList = ({ guests, lastGuestElementRef }) => {
  return (
    <ul className={css.list}>
      {guests.map((guest, index) => {
        return (
          <li
            key={guest._id}
            ref={guests.length === index + 1 ? lastGuestElementRef : null}
          >
            <GuestTile guest={guest}></GuestTile>
          </li>
        );
      })}
    </ul>
  );
};

export default GuestsList;
