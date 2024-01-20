import React, { useContext, useState, useEffect } from "react";
import Auth from "./views/Auth";
import Panel from "./views/Panel";
import Favicon from "react-favicon";
import Landing from "./views/Landing";
import Pricing from "./views/Pricing";
import Checkout from "./views/Checkout";
import useSocket from "./hooks/useSocket";
import Modal from "./components/global/Modal";
import { handleURLParams } from "./utils/auth";
import { Router, navigate } from "@reach/router";
import { AuthContext } from "./context/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import { ModalContext } from "./context/ModalContext";
import ErrorAlert from "./components/common/ErrorAlert";
import FirebaseService from "./services/FirebaseService";
import SuccessAlert from "./components/common/SuccessAlert";
import { CapacitorContext } from "./context/CapacitorContext";
import { AppConfigContext } from "./context/AppConfigContext";
import { MessagesContext } from "./context/MessagesContext";
import { ConversationsContext } from "./context/ConversationsContext";
import { getValue } from "./utils";
import IntroVideo from "./components/welcome/IntroVideo";

const Main = () => {
  const [socket, setupSocket] = useSocket();
  const [firstLoad, setFirstLoad] = useState(true);
  const appconfig = useContext(AppConfigContext);
  const { setConversation } = useContext(MessagesContext);
  const { conversation } = useContext(ConversationsContext);
  const { clearModal, modalComponent } = useContext(ModalContext);
  const { setupDevice, setupPlatform } = useContext(CapacitorContext);
  const { user, refresh, getCurrentUser, userLoggedIn } =
    useContext(AuthContext);

  const { firebaseConfig } = appconfig;

  useEffect(() => {
    setupDevice();
    userLoggedIn();
    setupPlatform();
    handleURLParams(handleLoginURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      setupSocket();
    }
  }, [firstLoad]);

  useEffect(() => {
    if (appconfig !== null) {
      if (appconfig.app_name !== null) {
        document.title = appconfig.app_name;
      }
    }
  }, [appconfig]);

  useEffect(() => {
    if (conversation && conversation !== null) {
      setConversation(conversation);
    }
  }, [conversation]);

  useEffect(() => {
    if (user !== null) {
      if (firstLoad) {
        setFirstLoad(false);
      }

      const route = window.location.pathname;
      if (route.includes("login")) {
        navigate("/");
      }

      if (user.show_video) {
        setTimeout(handleVideo, 1000);
      }
    }
  }, [user]);

  useEffect(() => {
    if (refresh) handleRefresh();
  }, [refresh]);

  const handleVideo = () => {
    modalComponent("Welcome", <IntroVideo />, { size: "lg" });
  };

  const handleRefresh = () => {
    modalComponent("", <LoginForm handleCallback={clearModal} />);
  };

  const handleLoginURL = (uid) => {
    const AuthService = FirebaseService(firebaseConfig);
    AuthService.setToken(uid);
    getCurrentUser();
  };

  const renderFavicon = () => {
    const favicon_url = getValue(appconfig, "favicon_url");
    if (favicon_url !== null) {
      return <Favicon url={favicon_url} />;
    }
  };

  return (
    <div id="main" className="container-fluid px-0 overflow-hidden">
      {renderFavicon()}
      <Router className="h-100 overflow-hidden">
        <Pricing path="/pricing" />
        <Checkout path="/checkout/:product_id" />
        {user !== null
          ? [<Panel key="panel" path="/*" />]
          : [
              <Landing key="landing" path="/" />,
              <Auth key="auth" path="/auth/*" />,
            ]}
      </Router>
      <Modal />
      <ErrorAlert />
      <SuccessAlert />
    </div>
  );
};

export default Main;
