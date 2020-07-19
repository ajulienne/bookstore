import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/actions";
import { useHistory, useLocation } from "react-router-dom";
import "./Login.scss";
import { useTranslation } from "react-i18next";

export const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { t } = useTranslation();

  useEffect(() => {
    // Redirige vers la page précédente ou la racine si on a un utilisateur connecté
    if (auth.loggedUser) {
      history.push(location.state?.redirect || "/");
    }
  }, [auth.loggedUser, history, location]);

  const connect = (form) => {
    dispatch(login(form.email, form.password));
  };

  return (
    <div data-testid="login" className="login-form">
      <h1>{t("login.title")}</h1>
      <div className="message">
        {auth.error && (
          <div className="error" data-testid="error-message">
            {t(auth.error)}
          </div>
        )}
        {location.state?.errorMessage && (
          <div className="error" data-testid="error-message">
            {t(location.state?.errorMessage)}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(connect)}>
        <div data-testid="email" className="control">
          <label htmlFor="email">{t("login.form.controls.email.label")}</label>
          <input type="email" name="email" id="email" ref={register({ required: { value: true, message: t("login.form.controls.email.required") } })} />
          {errors.email && <span className="control-error">{errors.email.message}</span>}
        </div>
        <div data-testid="password" className="control">
          <label htmlFor="password">{t("login.form.controls.email.label")}</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({ required: { value: true, message: t("login.form.controls.password.required") } })}
          />
          {errors.password && <span className="control-error">{errors.password.message}</span>}
        </div>
        <div>
          <input type="submit" value={t("login.form.buttons.login")} />
        </div>
      </form>
    </div>
  );
};
