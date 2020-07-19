import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions";
import { getDummyAvatarFromUsername } from "./utils/image";
import { useTranslation } from "react-i18next";
import { SwitchLang } from "./SwitchLang";

export const NavBar = (props) => {
  const loggedUser = useSelector((state) => state.authReducer.loggedUser);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <nav>
      <div className="brand">Bookstore</div>
      <div className="links">
        <NavLink to="/books">{t("navbar.booksLink")}</NavLink>
        <NavLink to="/admin">{t("navbar.adminLink")}</NavLink>
      </div>
      <div className="auth">
        {loggedUser ? (
          <>
            <div data-testid="login-hello" className="user">
              <img src={getDummyAvatarFromUsername(loggedUser.username, 32)} alt={loggedUser.username} /> {loggedUser.username}
            </div>
            |
            <button data-testid="logout-button" onClick={() => dispatch(logout())}>
              {t("navbar.logoutLink")}
            </button>
          </>
        ) : (
          <NavLink data-testid="login-button" to="/login">
            {t("navbar.loginLink")}
          </NavLink>
        )}
        <SwitchLang />
      </div>
    </nav>
  );
};
