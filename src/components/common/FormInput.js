import React from 'react'

export default function FormInput({
  label, 
  description, 
  type, 
  valid,
  value,
  handleChange
}) {
  return (
    <div className={`w-100 mb-2`}>
      <label>
        <b>{label}</b>
      </label>
      <label className="small text-muted d-block mb-1">{description}</label>
      <input
        type={type !== "number" ? "text" : type}
        className={`form-control z-2 w-${
          type === "number" ? "25 text-center" : "100"
        } ${valid ? "" : "border border-danger"}`}
        value={value}
        onChange={handleChange}
      />
      <span
        className={`text-danger 
        ${valid ? "d-none" : ""}`}
      >
        The input can't be empty
      </span>
    </div>
  )
}
