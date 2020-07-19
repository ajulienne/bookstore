import React, { useState, useEffect } from "react";
import { getAuthors } from "../../services/author.service";
import { addBook } from "../../services/books.service";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const AddBook = (props) => {
  const [authorList, setAuthorList] = useState([]);

  const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { register, handleSubmit, errors, reset } = useForm();

  const { t } = useTranslation();

  const submitNewBook = (data) => {
    addBook(data)
      .then(() => {
        reset();
        setMessage("admin.addBook.messages.addBookSuccess");
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    getAuthors().then((data) => {
      setAuthorList(data);
    });
  }, []);

  return (
    <div data-testid="admin-add-book">
      <h1>{t("admin.addBook.title")}</h1>
      <div className="message">
        {message && !errorMessage && <div className="success">{t(message)}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <form onSubmit={handleSubmit(submitNewBook)}>
        <div className="control">
          <label htmlFor="title">{t("admin.addBook.form.controls.title.label")}</label>
          <input
            data-testid="title"
            type="text"
            name="title"
            id="title"
            ref={register({ required: { value: true, message: t("admin.addBook.form.controls.title.required") } })}
          />
          {errors.title && <span className="control-error">{errors.title.message}</span>}
        </div>
        <div className="control">
          <label htmlFor="author">{t("admin.addBook.form.controls.author.label")}</label>
          <select
            data-testid="author"
            name="author"
            id="author"
            ref={register({ required: { value: true, message: t("admin.addBook.form.controls.author.required") } })}
          >
            {authorList.length ? (
              authorList.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))
            ) : (
              <option disabled>Loading authors...</option>
            )}
          </select>
          {errors.author && <span className="control-error">{errors.author.message}</span>}
        </div>
        <div className="control">
          <label htmlFor="stock">{t("admin.addBook.form.controls.stock.label")}</label>
          <input
            data-testid="stock"
            type="number"
            name="stock"
            id="stock"
            min="0"
            ref={register({
              required: { value: true, message: t("admin.addBook.form.controls.stock.required") },
              min: { value: 0, message: t("admin.addBook.form.controls.stock.min") },
            })}
          />
          {errors.stock && <span className="control-error">{errors.stock.message}</span>}
        </div>
        <div className="control">
          <label htmlFor="summary">{t("admin.addBook.form.controls.summary.label")}</label>
          <textarea data-testid="summary" name="summary" id="summary" rows="10" ref={register}></textarea>
          {errors.summary && <span className="control-error">{errors.summary.message}</span>}
        </div>
        <div className="control">
          <label htmlFor="cover">{t("admin.addBook.form.controls.cover.label")}</label>
          <input
            data-testid="cover"
            type="url"
            placeholder="http://..."
            name="cover"
            id="cover"
            ref={register({
              required: false,
              pattern: { value: /https?:\/\/([a-zA-Z0-9%+:#?.\-_/]*)/, message: t("admin.addBook.form.controls.cover.pattern") },
            })}
          />
          {errors.cover && <span className="control-error">{errors.cover.message}</span>}
        </div>
        <div>
          <input type="submit" data-testid="submit" value={t("admin.addBook.form.buttons.add")} />
        </div>
      </form>
    </div>
  );
};
