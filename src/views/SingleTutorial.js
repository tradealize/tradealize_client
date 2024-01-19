import React, { useContext, useEffect } from "react";
import { TutorialsContext } from "../context/TutorialsContext";

const SingleTutorial = ({ tutorial_id }) => {
  const { tutorial, getSingleTutorial } = useContext(TutorialsContext);

  useEffect(() => {
    getSingleTutorial(tutorial_id);
  }, [tutorial]);

  const renderName = () => {
    if (tutorial && tutorial !== null) {
      return tutorial.name;
    }
  };

  const renderSrc = () => {
    if (!String(tutorial.src).includes("?")) {
      return `${tutorial.src}?`;
    }
    return `${tutorial.src}&`;
  };

  const renderVideo = () => {
    if (tutorial && tutorial !== null) {
      return (
        <div className="card p-3 shadow mb-3">
          <iframe
            title="Open AI Secret Key Blur V1"
            src={`https://player.vimeo.com/video/${renderSrc()}badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            allow="autoplay; fullscreen; picture-in-picture"
            className="mw-100 w-100 my-3 vimeo-player"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container">
      <h1 className="text-center">{renderName()}</h1>
      {renderVideo()}
    </div>
  );
};

export default SingleTutorial;
