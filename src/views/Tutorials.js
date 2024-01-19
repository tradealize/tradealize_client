import React, { useContext, useEffect } from "react";
import TutorialCard from "../components/tutorials/TutorialCard";
import { TutorialsContext } from "../context/TutorialsContext";
import { MenuContext } from "../context/MenuContext";

const Tutorials = () => {
  const { tutorials, getTutorials } = useContext(TutorialsContext);
  const { setSelected } = useContext(MenuContext);

  useEffect(() => {
    getTutorials();
    setSelected("Tutorials");
  }, []);

  const renderTutorials = () => {
    if (Array.isArray(tutorials)) {
      return tutorials.map((tutorial) => (
        <TutorialCard key={tutorial.tutorial_id} tutorial={tutorial} />
      ));
    }
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-gradient d-inline-block">Tutorials</h1>
      <div className="row">{renderTutorials()}</div>
    </div>
  );
};

export default Tutorials;
