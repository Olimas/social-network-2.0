import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}

export type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
      <div className={s.loginBlock}>
        {props.isAuth
          ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'/login'}><button>Login</button></NavLink>}
      </div>
    </header>
  );
};
export default Header;
