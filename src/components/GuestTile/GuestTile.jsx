import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import css from "./GuestTile.module.css";

dayjs.extend(relativeTime);

const GuestTile = ({ guest }) => {
  const { name, email, birthDate } = guest;

  return (
    <div className={css.guest}>
      <h3>{name} </h3>
      <p className={css.date}>{dayjs(birthDate).toNow(true)}</p>
      <a className={css.email} href={`mailto:${email}}`}>
        {email}
      </a>
    </div>
  );
};

export default GuestTile;
