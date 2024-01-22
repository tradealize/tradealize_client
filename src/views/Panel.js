import React, { useContext, useEffect } from "react";
import Sorry from "./Sorry";
import Upgrade from "./Upgrade";
import Profile from "./Profile";
import Conversations from "./Conversations";
import Sidebar from "../components/global/Sidebar";
import { Router, useLocation } from "@reach/router";
import { AuthContext } from "../context/AuthContext";
import SingleConversation from "./SingleConversation";
import MenuMobile from "../components/navbar/MenuMobile";
import Settings from "./Settings";

const Panel = () => {
  const location = useLocation();
  const { user, getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      getCurrentUser();
    }
  }, [location]);

  return (
    <div
      className={`position-relative pt-5 pt-md-0 container-fluid px-0 px-md-3 d-flex flex-row align-items-center overflow-hidden`}
      style={{
        height: "98vh",
      }}
    >
      <Sidebar />
      <MenuMobile />
      <div className="position-relative content overflow-hidden row flex-column px-0 me-0 flex-nowrap">
        <Router
          className="position-relative overflow-hidden"
          style={{ flex: 1 }}
        >
          <Sorry path="/sorry" />
          <Conversations path="/" />
          <Upgrade path="/upgrade" />
          <Profile path="/profile" />
          <Settings path="/settings" />
          <SingleConversation
            titleGradient
            path="/conversations/:conversation_id"
          />
        </Router>
      </div>
    </div>
  );
};

export default Panel;
