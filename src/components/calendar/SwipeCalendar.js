import React, { useRef, useEffect } from "react";
import moment from "moment";

const SwipeCalendar = ({ startDate, endDate, currentDay, setCurrentDay }) => {
  const calendar = useRef();

  useEffect(() => {
    setCurrentDay(moment().local().format("YYYY-MM-DD"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentDay !== null) {
      handleSetCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  const handleSetCard = () => {
    let firstCard = document.getElementsByClassName("day-card")[0];
    if (firstCard && firstCard !== null && calendar !== null) {
      setCurrentDayCard(firstCard.clientWidth);
    } else {
      setTimeout(handleSetCard, 500);
    }
  };

  const setCurrentDayCard = (width) => {
    let diff = moment(currentDay).diff(moment(startDate), "days");
    let total = width * diff;
    total -= calendar.current.clientWidth / 2;
    if (total > 0) {
      calendar.current.scrollTo({
        left: `${total + width / 2}`,
      });
    }
  };

  const renderDays = () => {
    if (startDate !== null && endDate !== null) {
      let start = moment(startDate);
      let end = moment(endDate);
      let components = [];
      while (start.isBefore(end)) {
        let formattedString = start.format("YYYY-MM-DD");
        components.push(
          <div
            key={formattedString}
            className={"day-card col px-1 py-2 d-inline-block"}
            onClick={() => setCurrentDay(formattedString)}
          >
            <div
              className={
                "br-10  py-3 text-center" +
                (currentDay === formattedString
                  ? " text-primary border border-primary"
                  : "")
              }
            >
              <p className="mb-1 text-uppercase">{start.format("ddd")}</p>
              <h4 className="h2 mb-1">{start.format("DD")}</h4>
              {currentDay === formattedString ? (
                <i className="fa fa-circle text-primary"></i>
              ) : (
                ""
              )}
            </div>
          </div>
        );
        start.add(1, "day");
      }
      return components;
    }
  };

  return (
    <div className="swipe-container mt-3" ref={calendar}>
      {renderDays()}
    </div>
  );
};

export default SwipeCalendar;
