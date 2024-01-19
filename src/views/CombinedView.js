import React, { useContext } from "react";
import Outputs from "./Outputs";
import { AvatarsContext } from "../context/AvatarsContext";
import TrainingList from "../components/trainings/TrainingList";
import useTranslations from "../hooks/useTranslations";

const CombinedView = ({ avatar_id }) => {
  const translations = useTranslations();
  const { avatar, getSingleAvatar } = useContext(AvatarsContext);

  const fetchTrainings = (filters) => getSingleAvatar(avatar_id, filters);

  return (
    <div className="row">
      <div className="col-12 col-md-4 px-0">
        <TrainingList
          title={translations.avatar.trainings.title}
          avatar={avatar}
          trainings={avatar.trainings}
          fetchTrainings={fetchTrainings}
        />
      </div>
      <div className="col-12 col-md-8 pe-0 hide-mobile">
        <Outputs avatar_id={avatar.avatar_id} />
      </div>
    </div>
  );
};

export default CombinedView;
