import React from "react";
const FieldMapResult = ({ title, fields, clearFields }) => {
  return (
    <div className="card shadow p-3 mb-3">
      <div className="container-fluid px-0">
        <h5 className="bold">{title}</h5>
        {fields.map((field) => (
          <div key={field.target} className="row align-items-center my-3">
            <div className="col-6">{field.target}</div>
            <div className="col-6">{field.selected}</div>
          </div>
        ))}
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={clearFields}
        >
          <i className="fa fa-edit me-1"></i>Editar Campos
        </button>
      </div>
    </div>
  );
};

export default FieldMapResult;
