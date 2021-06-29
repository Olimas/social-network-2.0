import s from './Aside.module.css'
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Aside = (props) => {
  return (
    <aside className={s.aside}>
      <ul className={s.itemList}>
        <li className={`${s.item} ${s.active}`}>
          <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>Dialogs</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
