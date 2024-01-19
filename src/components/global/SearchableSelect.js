import React, { useEffect, useState } from "react";
import Select from "react-select";
import useDarkMode from "../../hooks/useDarkMode";

const SearchableSelect = ({
  items,
  itemText,
  itemValue,
  modifier,
  error,
  value,
  placeholderText
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const selectOptions = items.map((item) => ({
    value: item[itemValue],
    label: item[itemText],
  }));

  const [dark_mode] = useDarkMode()

  const baseStyles = {
    control: (provided) => ({
      ...provided,
      border: "0.5px solid rgb(229, 231, 235, 0.5)",
      backgroundColor: dark_mode ? "#212529" : "#f7f7f7",
      borderRadius: "25px",
      paddingLeft: "16px",
      color: dark_mode ? "white" : "black"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: dark_mode ? "white" : "black",
    }),
    option: (provided) => ({
      ...provided,
      color: dark_mode ? "white" : "black",
      backgroundColor: dark_mode ? "#212529" : "#f7f7f7",
    }),
    input: (provided) => ({
      ...provided,
      color: dark_mode ? "white" : "black",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      backgroundColor: dark_mode ? "#212529" : "#f7f7f7",
      color: dark_mode ? "white" : "black",
    }),
    options: (provided) => ({
      ...provided,
      backgroundColor: dark_mode ? "#212529" : "#f7f7f7",
      color: dark_mode ? "white" : "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: dark_mode ? "#212529" : "#f7f7f7",
    }),
  };

  const customStyles = {
    ...baseStyles,
    control: (provided) => ({
      ...baseStyles.control(provided),
      boxShadow: error ? "0 0 0 1.5px #dc3545" : "none",
    }),
  };

  useEffect(() => {
    if (value && selectOptions) {
      const initialOption = selectOptions.filter((option) => {
        return option.value == value;
      });

      setSelectedItem(initialOption);
    }
  }, [value]);

  const handleChange = (selectedOption) => {
    setSelectedItem(selectedOption);
    if (modifier) {
      modifier(selectedOption);
    }
  };



  return (
    <Select
      options={selectOptions}
      value={selectedItem}
      onChange={handleChange}
      isSearchable
      placeholder={placeholderText}
      styles={customStyles}
    />
  );
};

export default SearchableSelect;
