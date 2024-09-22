import GuestTile from "../GuestTile/GuestTile";
import css from "./GuestsList.module.css";

const GuestsList = ({ guests }) => {
  return (
    <ul className={css.list}>
      {guests.map((guest) => {
        return (
          <li key={guest._id}>
            <GuestTile guest={guest}></GuestTile>
          </li>
        );
      })}
    </ul>
  );
};

export default GuestsList;
