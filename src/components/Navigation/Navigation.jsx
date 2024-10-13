import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className="w-full flex flex-col gap-10 p-5  bg-teal-500 md:flex-row p-10 justify-between ">
      <div className="flex gap-20">
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/Movies">
          Movies
        </NavLink>
      </div>
      <div>
        <p>All information obtained from the resource:</p>
        <a href="https://www.themoviedb.org/" target="_blank">
          https://www.themoviedb.org/
        </a>
      </div>
    </div>
  );
};
export default Navigation;
