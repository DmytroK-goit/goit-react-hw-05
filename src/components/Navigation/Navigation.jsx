import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/Movies">
          Movies
        </NavLink>
      </div>
    </div>
  );
};
export default Navigation;
