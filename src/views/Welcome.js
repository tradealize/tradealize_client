import { Link } from "@reach/router";
import React from "react";

const Welcome = () => {
  return (
    <div className="container text-center py-5">
      <h1>Welcome to BemodoAI Content Genius</h1>
      <p>Please watch this video as it will guide you on your first steps.</p>
      <div className="card p-3 shadow mb-3">
        <iframe
          title="Open AI Secret Key Blur V1"
          src="https://player.vimeo.com/video/836546767?h=d8cb46166d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture"
          className="mw-100 w-100 my-3 vimeo-player"
          allowFullScreen
        ></iframe>
      </div>
      <Link to="/settings" className="btn btn-primary m-auto d-block">
        Continue
      </Link>
    </div>
  );
};

export default Welcome;
