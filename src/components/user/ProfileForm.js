import React, { useContext, useEffect } from "react";
import { profileQuestions } from "../../utils/renter";
import DynamicForm from "../global/DynamicForm";
import { ProfileContext } from "../../context/ProfileContext";

const ProfileForm = ({ saveAction, hideButtons }) => {
  const { profile, setProfile, postProfile, setPropertyProfile } =
    useContext(ProfileContext);

  useEffect(() => {
    setProfile({});
  }, []);

  return (
    <DynamicForm
      object={profile}
      hideButtons={hideButtons}
      questions={profileQuestions}
      modifier={setPropertyProfile}
      saveAction={typeof saveAction === "function" ? saveAction : postProfile}
    />
  );
};

export default ProfileForm;
