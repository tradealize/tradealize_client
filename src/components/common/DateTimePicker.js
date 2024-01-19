import React from "react";

const DateTimePicker = ({ value, modifier }) => {
  const getDateValue = () => {
    if (value && value !== null && value !== "") {
      return value.split(" ")[0];
    }
    return "";
  };
  const getHourValue = () => {
    if (value && value !== null && value !== "") {
      return value.split(" ")[1].split(":")[0];
    }
    return "";
  };
  const getMinuteValue = () => {
    if (value && value !== null && value !== "") {
      return value.split(" ")[1].split(":")[1];
    }
    return "";
  };
  const handleChangeHour = (hour) => {
    let hourString = String(hour);
    if (hourString.length === 1) {
      hourString = `0${hourString}`;
    } else if (hourString.length > 2) {
      if (hourString[0] === "0") {
        hourString = hourString.substr(1);
      } else {
        hourString = hourString.substr(0, 2);
      }
    }
    if (parseInt(hourString) > 23) hourString = "23";
    if (parseInt(hourString) < 0) hourString = "0";
    const date = value.split(" ")[0];
    const minutes = value.split(" ")[1].split(":")[1];
    modifier(`${date} ${hourString}:${minutes}`);
  };

  const handleChangeMinutes = (minutes) => {
    let minuteString = String(minutes);
    if (minuteString.length === 1) {
      minuteString = `0${minuteString}`;
    } else if (minuteString.length > 2) {
      if (minuteString[0] === "0") {
        minuteString = minuteString.substr(1);
      } else {
        minuteString = minuteString.substr(0, 2);
      }
    }
    if (parseInt(minuteString) > 59) minuteString = "23";
    if (parseInt(minuteString) < 0) minuteString = "0";
    const date = value.split(" ")[0];
    const hours = value.split(" ")[1].split(":")[0];
    modifier(`${date} ${hours}:${minuteString}`);
  };

  return (
    <div className="row mb-3">
      <div className="col-6">
        <label className="mb-1">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={getDateValue()}
          onChange={(e) => modifier(`${e.target.value} ${value.split(" ")[1]}`)}
        />
      </div>
      <div className="col-6">
        <label className="mb-1">Hora (0h - 23h)</label>
        <div className="row">
          <div className="col-6">
            <input
              min={0}
              max={23}
              type="number"
              className="form-control"
              value={getHourValue()}
              onChange={(e) => handleChangeHour(e.target.value)}
            />
          </div>
          <div className="col-6">
            <input
              min={0}
              max={59}
              type="number"
              className="form-control"
              value={getMinuteValue()}
              onChange={(e) => handleChangeMinutes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
