import React, { useEffect, useContext } from "react";
import { AvatarsContext } from "../context/AvatarsContext";
import { ModalContext } from "../context/ModalContext";
import TrainingList from "../components/trainings/TrainingList";
import TrainingForm from "../components/trainings/TrainingForm";
import Outputs from "./Outputs";
import { TrainingsContext } from "../context/TrainingsContext";

const AvatarTrainings = ({ avatar_id }) => {
  const { avatar, getSingleAvatar } = useContext(AvatarsContext);
  const { clearModal, modalComponent } = useContext(ModalContext);
  const { setTraining, createTraining } = useContext(TrainingsContext);

  useEffect(() => {
    if (avatar_id && avatar_id !== null && avatar_id !== "") {
      getSingleAvatar(avatar_id);
    } else if (avatar && avatar !== null) {
      getSingleAvatar(avatar.avatar_id);
    }
  }, [avatar, avatar_id]);

  const handleCancel = () => {
    clearModal();
    setTraining(null);
  };

  const handleCreate = () => {
    createTraining();
    modalComponent(
      "Create Training",
      <TrainingForm handleCancel={handleCancel} />
    );
  };

  const renderTrainings = () => {
    if (avatar && avatar !== null) {
      if (Array.isArray(avatar.trainings)) {
        return (
          <TrainingList
            handleCreate={handleCreate}
            trainings={avatar.trainings}
            title="Trainings"
            avatar={avatar}
          />
        );
      }
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-12 col-xl-6 px-0">{renderTrainings()}</div>
      <div className="col-12 col-md-12 col-xl-6">
        <Outputs avatar_id={avatar_id} />;
      </div>
    </div>
  );
};

export default AvatarTrainings;
