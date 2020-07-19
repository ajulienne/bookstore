import React, { useState, useRef } from "react";
import { addAuthor } from "../../services/author.service";
import { useTranslation } from "react-i18next";

export const AddAuthor = (props) => {
  const name = useRef(null);

  const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuthor({
      name: name.current.value,
    })
      .then((data) => {
        name.current.value = "";
        setMessage("admin.addAuthor.messages.addAuthorSuccess");
        setErrorMessage(null);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div data-testid="admin-add-author">
      <h1>{t("admin.addAuthor.title")}</h1>
      <div className="message">
        {message && !errorMessage && <div className="success">{t(message)}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <div data-testid="name" className="control">
          <label htmlFor="name">{t("admin.addBook.form.controls.title.label")}</label>
          <input type="text" name="name" id="name" ref={name} defaultValue="" />
        </div>
        <div>
          <input type="submit" value={t("admin.addBook.form.buttons.add")} />
        </div>
      </form>
    </div>
  );
};
