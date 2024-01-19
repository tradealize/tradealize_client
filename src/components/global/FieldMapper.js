import React, { useState, useEffect } from "react";

const FieldMapper = ({ title, fields, options, handleSubmit }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (Array.isArray(fields)) {
      setSelected(null);
      const current = fields.map((field) => ({
        target: field,
        selected: "",
      }));
      setSelected(current);
    }
  }, [fields, title]);

  useEffect(() => {
    if (Array.isArray(fields) && Array.isArray(options) && selected !== null) {
      if (fields.length > 0 && options.length > 0) {
        const firstElement = selected.find((item) => item.target === fields[0]);
        if (firstElement && firstElement.selected === null) {
          handleChange(fields[0], options[0]);
        }
      }
    }
  }, [fields, options]);

  const getColValue = (col) => {
    if (Array.isArray(selected)) {
      const currentColumn = selected.find((field) => field.target === col);
      if (currentColumn) {
        if (currentColumn.selected !== undefined) {
          return `${currentColumn.selected}-${currentColumn.index}`;
        }
      }
    }
    return "";
  };

  const saveFields = () => {
    handleSubmit(selected);
  };

  const handleChange = (col, value) => {
    let currentSelected = [...selected];
    let currentValue = String(value).split("-")[0];
    let index = String(value).split("-")[1];
    let currentColumn = currentSelected.find((field) => col === field.target);
    if (currentColumn) {
      currentColumn.selected = currentValue;
      currentColumn.index = index;
    }
    setSelected(currentSelected);
  };

  const renderOptions = (key) => {
    return [
      <option value="" key="">
        Elige una columna
      </option>,
      ...options.map((option, index) => (
        <option
          key={`${key}-${option}-${index}`}
          value={`${String(option).replaceAll("-", "_")}-${index}`}
        >
          {option}
        </option>
      )),
    ];
  };

  const renderFields = () => {
    if (Array.isArray(fields) && Array.isArray(selected)) {
      return fields.map((col) => {
        const value = getColValue(col);
        return (
          <div key={col} className="row align-items-center my-2">
            <div className="col-6">{col}</div>
            <div className="col-6">
              <select
                value={value}
                className="form-control"
                onChange={(e) => handleChange(col, e.target.value)}
              >
                {renderOptions(col)}
              </select>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <h5 className="bold">{title}</h5>
      {renderFields()}
      <button className="btn btn-sm btn-outline-primary" onClick={saveFields}>
        <i className="fa fa-save me-2"></i>Guardar Campos
      </button>
    </div>
  );
};

export default FieldMapper;
