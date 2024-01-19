import React, { useEffect, useRef } from 'react'

export default function TextareaInput({
  label, 
  description, 
  valid,
  value,
  handleChange,
  maxHeight,
  smallDescription,
  containerHeight
}) {

  useEffect(() => {
    setTimeout(() => {
      hanldeHeight();
    }, 500);
  }, [value]);

  const inputRef = useRef();

  const hanldeHeight = () => {
    if(inputRef.current !== null) {
      if (value === "") {
        // inputRef.current.style.height = "0px";
      } else {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 2 + "px";
      }
    }
  }


  return (
    <>
      <label className='px-0'>
        <b>{label}</b>
      </label>
      <label 
        className={`${description === null ? 'd-none' : ''} 
        ${smallDescription ? 'small' : ''} text-muted d-block mb-1 px-0`}
      >
        {description}
      </label>
      <textarea
        ref={inputRef}
        style={{
          maxHeight: maxHeight ? maxHeight : 'calc(100% - 82px)',
        }}
        className={`form-control ${valid ? "" : "border border-danger"}`}
        value={value}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
      <span
        className={`text-danger 
        ${valid ? "d-none" : ""}`}
      >
        The input can't be empty
      </span>
    </>
  )
}
