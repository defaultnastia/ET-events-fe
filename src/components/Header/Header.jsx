import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
    <div className={css.stripe}>
      <div className={css.navbar}>
        <nav className={css.navlist}>
          <ul>
            <li>
              <NavLink to="/catalog">Events</NavLink>
            </li>
            <li>
              <a
                href="https://github.com/defaultnastia/ET-events-fe"
                target="_blank"
              >
                🔗 FE GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/defaultnastia/ET-events-be"
                target="_blank"
              >
                🔗 BE GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
