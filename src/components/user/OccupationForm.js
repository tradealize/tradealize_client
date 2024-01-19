import React, { useContext, useEffect } from "react";
import { OccupationContext } from "../../context/OccupationContext";
import { occupationQuestions } from "../../utils/renter";
import DynamicForm from "../global/DynamicForm";

const OccupationForm = ({ hideButtons, saveAction }) => {
  const { occupation, setOccupation, setPropertyOccupation } =
    useContext(OccupationContext);

  useEffect(() => {
    setOccupation({});
  }, []);

  return (
    <DynamicForm
      object={occupation}
      hideButtons={hideButtons}
      questions={occupationQuestions}
      modifier={setPropertyOccupation}
      saveAction={saveAction}
    />
  );
};

export default OccupationForm;
