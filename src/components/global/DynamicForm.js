import React, { useEffect } from "react";
import ReactSwitch from "react-switch";
import { getValue } from "../../utils";
import useTranslations from "../../hooks/useTranslations";

const DynamicForm = ({
  object,
  spinner,
  modifier,
  questions,
  saveAction,
  hideButtons,
  handleCancel,
}) => {
  useEffect(() => {
    if (Array.isArray(questions)) {
      handleSelectValues();
    }
  }, [questions]);

  const translations = useTranslations();

  const handleSelectValues = () => {
    let selectQuestions = questions.filter(({ type }) => type === "select");
    selectQuestions.forEach((question) => {
      if (
        !object[question.id] ||
        object[question.id] === undefined ||
        object[question.id] === null
      ) {
        const { options } = question;
        if (Array.isArray(options) && options.length > 0) {
          const firstOption = options[0];
          if (firstOption !== undefined && firstOption !== null) {
            modifier(question.id, firstOption.value);
          }
        }
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof saveAction === "function") {
      saveAction(object);
    }
  };

  const renderForm = () => {
    if (Array.isArray(questions) && object !== null) {
      let questionsRender = [...questions];
      questionsRender = questionsRender
        .filter((question) => {
          if (question.precondition) {
            if (!question.precondition(object)) {
              return null;
            }
          }
          return question;
        })
        .filter((question) => question !== null);
      return questionsRender.map((question) => (
        <div
          key={question.id}
          className={question.className ? question.className : "col-12 mb-3"}
        >
          {question.type !== "boolean" && (
            <label htmlFor={question.id} className="form-label mb-0">
              {question.label}
            </label>
          )}
          {renderInput(question)}
        </div>
      ));
    }
  };

  const renderOptions = (options) => {
    return options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  };

  const renderInput = (question) => {
    const { id, type, label, required, options } = question;
    if (type === "select") {
      return (
        <select
          value={getValue(object, id)}
          className="form-control"
          onChange={(e) => modifier(id, e.target.value)}
        >
          {renderOptions(options)}
        </select>
      );
    }
    if (type === "boolean") {
      return (
        <label className="d-flex align-items-center">
          <ReactSwitch
            checked={getValue(object, id) === true}
            className="me-2"
            onChange={(checked) => modifier(id, checked)}
          />
          {label}
        </label>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          rows="4"
          id={id}
          name={id}
          required={required}
          value={getValue(object, id)}
          className="form-control mb-3"
          onChange={(event) => modifier(id, event.target.value)}
        />
      );
    }
    return (
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={getValue(object, id)}
        className="form-control"
        onChange={(event) => modifier(id, event.target.value)}
      />
    );
  };

  const renderButtons = () => {
    if (!hideButtons) {
      return (
        <div className="row mt-3">
          <div className="col-6 text-end">
            <button
              type="button"
              onClick={handleCancel}
              className="btn w-100 text-muted px-0"
            >
              {translations.form.cancel}
            </button>
          </div>
          <div className="col-6">
            <button
              type="submit"
              disabled={spinner}
              className="btn w-100 btn-primary"
            >
              {spinner ? (
                <div className="spinner-border"></div>
              ) : (
                translations.form.confirm
              )}
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">{renderForm()}</div>
      {renderButtons()}
    </form>
  );
};

export default DynamicForm;
