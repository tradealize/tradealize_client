import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
const IntroVideo = () => {
  const { clearModal } = useContext(ModalContext);
  const { user, updateUser } = useContext(AuthContext);

  const hideForever = () => {
    updateUser({ ...user, show_video: false }, () => {}, true);
  };
  return (
    <div>
      <div>
        <iframe
          title="Welcome to Tradealize"
          src="https://player.vimeo.com/video/901604230?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture"
          className="mw-100 w-100 my-3 vimeo-player"
          allowFullScreen
        ></iframe>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            onClick={hideForever}
            className="btn btn-sm btn-link text-center mt-4 d-block m-auto"
          >
            Don't show this again
          </button>
        </div>
        <div className="col-6">
          <button onClick={clearModal} className="btn w-100 btn-primary">
            OK, Thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;
