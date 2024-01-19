import React, { useContext, useEffect, useState } from "react";
import { AvatarsContext } from "../context/AvatarsContext";
import { MenuContext } from "../context/MenuContext";
import AvatarInputContext from "../components/avatars/AvatarInputContext";
import AvatarInputFiles from "../components/avatars/AvatarInputFiles";
import AvatarTraining from "../components/avatars/AvatarTraining";
import AvatarFileCard from "../components/avatars/AvatarFileCard";
import AvatarOutput from "../components/avatars/AvatarOutput";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import useTranslations from "../hooks/useTranslations";
import TemplateList from "../components/templates/TemplatesList";
import { navigate } from "@reach/router";

const SingleAvatar = ({ avatar_id }) => {
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [smallDevice, setSmallDevice] = useState(false);

  const [formActive, setFormActive] = useState(false);
  const [formContainerActive, setFormContainerActive] = useState(false);
  const [filesActive, setFilesActive] = useState(false);
  const [beginTrainingActive, setBeginTrainingActive] = useState(false);
  const [templatesActive, setTemplatesActive] = useState(false);
  const [outputsActive, setOutputsActive] = useState(true);

  const [avatarHasContext, setAvatarHasContext] = useState(true);
  const [isEditingContext, setIsEditingContext] = useState(false);
  const [loadingContext, setLoadingContext] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const translations = useTranslations();
  const { setSelected } = useContext(MenuContext);
  const { user } = useContext(AuthContext);
  const { setThreadMessages } = useContext(MessagesContext);

  const { avatar, getSingleAvatar, saveAvatar, setAvatar, setPropertyAvatar } =
    useContext(AvatarsContext);

  useEffect(() => {
    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
      setAvatar(null);
      setThreadMessages([]);
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      await getSingleAvatar(avatar_id, user.user_id);
      setLoadingAvatar(false);
    };

    fetch();
  }, [avatar_id]);

  useEffect(() => {
    if (user.staff?.role === "admin") {
      setIsUserAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    if (!smallDevice && isUserAdmin) {
      setFormContainerActive(true);
    }
  }, [smallDevice]);

  useEffect(() => {
    if (avatar && avatar !== null) {
      setSelected(avatar.name);

      if (avatar?.context !== null && avatar?.context?.length > 0) {
        setAvatarHasContext(true);
        setBeginTrainingActive(false);
        setFormActive(true);
        setFilesActive(true);

        if (isUserAdmin) setFormContainerActive(true);
      } else {
        setAvatarHasContext(false);
        setBeginTrainingActive(true);
        setFormActive(false);
        if (isUserAdmin) setFormContainerActive(true);
      }

      if (avatar?.context === null || avatar?.context === undefined) {
        setPropertyAvatar("context", "");
      }
    }
  }, [avatar]);

  const handleWindowSize = () => {
    if (window.screen.width <= 1300) {
      setSmallDevice(true);
    } else {
      setSmallDevice(false);
    }
  };

  const handleBeginTraining = () => {
    setIsEditingContext(true);
    setFormActive(true);
    setBeginTrainingActive(false);
  };

  const cancelEditContext = () => {
    setIsEditingContext(false);

    if (avatarHasContext) {
      setFilesActive(true);
    } else {
      setBeginTrainingActive(true);
      setFormActive(false);
      setFilesActive(false);
    }
  };

  const handleSaveContext = async (value) => {
    setLoadingContext(true);
    await saveAvatar({
      ...avatar,
      context: value,
    });
    setLoadingContext(false);

    if (!avatarHasContext) {
      setFilesActive(true);
    }

    setIsEditingContext(false);
  };

  const handleChangeSection = () => {
    if (formContainerActive) {
      setFormContainerActive(false);
    } else {
      setFormContainerActive(true);
    }
  };

  const renderAvatarTraining = () => {
    if (beginTrainingActive && isUserAdmin) {
      return (
        <AvatarTraining
          avatarName={avatar?.name}
          handleBegin={handleBeginTraining}
        />
      );
    }
  };

  const renderFileCards = () => {
    if (avatar?.avatar_files && avatar?.avatar_files.length > 0) {
      return (
        <div className="ps-0 col-12" style={{ overflowY: "auto", flex: 1 }}>
          {avatar.avatar_files.map((file, index) => {
            return (
              <AvatarFileCard
                key={index}
                fileName={file.file_data?.name}
                fileId={file.file_data?.file_id}
                type={file.file_data?.type}
                openaiFileId={file.openai_file_id}
                assistantId={avatar.assistant_id}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="col-12 px-0" style={{ flex: 1 }}>
          <div className="card bg-light p-3">
            <h3 className="text-primary">
              Your Avatar dont have any files yet.
            </h3>
            <p>
              Give more context to your Avatar and improve its responses
              uploading files!
            </p>
          </div>
        </div>
      );
    }
  };

  const renderFilesSection = () => {
    if (filesActive && isUserAdmin) {
      return (
        <>
          <div
            className="row mt-5 flex-column"
            style={{
              height: "calc((100% - 225px)/2)",
              minHeight: "215px",
              overflowY: "hidden",
            }}
          >
            <h3 className="px-0" style={{ height: "max-content" }}>
              Avatar Files
            </h3>
            {renderFileCards()}
          </div>

          <AvatarInputFiles />
        </>
      );
    }
  };

  const renderForm = () => {
    let componentActive = true;
    if (!formActive) componentActive = false;
    if (smallDevice && !formActive) componentActive = false;

    if (componentActive && isUserAdmin) {
      return (
        <>
          <AvatarInputContext
            isEditing={isEditingContext}
            setIsEditing={setIsEditingContext}
            handleCancel={cancelEditContext}
            handleSave={handleSaveContext}
            loading={loadingContext}
          />

          {renderFilesSection()}
        </>
      );
    }
  };

  const handleSetTemplatesActive = () => {
    if (templatesActive) {
      setTemplatesActive(false);

      if (avatarHasContext) {
        setFormActive(true);
        setFilesActive(true);
      } else {
        setBeginTrainingActive(true);
      }
    } else {
      setFormActive(false);
      setBeginTrainingActive(false);
      setFilesActive(false);
      setTemplatesActive(true);
    }
  };

  const handleToggleTemplates = () => {
    if (!smallDevice) {
      handleSetTemplatesActive();
    } else {
      if (templatesActive) {
        handleChangeSection();
        setTemplatesActive(false);

        if (avatarHasContext) {
          setFormActive(true);
          setFilesActive(true);
        } else {
          setBeginTrainingActive(true);
        }
      } else {
        handleChangeSection();
        setFormActive(false);
        setBeginTrainingActive(false);
        setFilesActive(false);
        setTemplatesActive(true);
      }
    }
  };

  const renderOutput = () => {
    let componentActive = true;
    if (!outputsActive) componentActive = false;
    if (smallDevice && formContainerActive) componentActive = false;

    return (
      <div
        className={`${smallDevice || !isUserAdmin ? "col-12" : "col-6"} 
        pb-3 h-100 ${componentActive ? "" : "d-none"}`}
      >
        <AvatarOutput
          templatesActive={templatesActive}
          setTemplatesActive={handleToggleTemplates}
        />
      </div>
    );
  };

  const renderLoading = () => {
    if (loadingAvatar) {
      return <div className=" ms-3 spinner-border"></div>;
    }
  };

  const handleApply = (templateId) => {
    navigate(`/templates/apply-avatar/${templateId}/${avatar_id}`);
  };

  const fetchTemplates = (params) => {
    getPublicTemplates(params);
  };

  const renderTemplates = () => {
    if (templatesActive) {
      return (
        <div className="row">
          <TemplateList
            title={translations.templates.title}
            templates={templates}
            handleApply={handleApply}
            fetchTemplates={fetchTemplates}
            handleBackBtn={handleToggleTemplates}
            disableAddBtn
            filtersActive
          />
        </div>
      );
    }
  };

  const renderContent = () => {
    if (!loadingAvatar) {
      return (
        <div
          className="row mt-2"
          style={{
            height: "calc(100% - 72px)",
          }}
        >
          <div
            className={`${smallDevice ? "col-12" : "col-6"} pb-3 d
            d-flex flex-column h-100 ${formContainerActive ? "" : "d-none"}`}
            style={{
              overflowY: "auto",
            }}
          >
            {renderAvatarTraining()}
            {renderForm()}
            {renderTemplates()}
          </div>

          {renderOutput()}
        </div>
      );
    }
  };

  const renderChangeSectionContent = () => {
    if (formContainerActive) {
      return (
        <>
          <span className="me-2 small hide-mobile">Conversation</span>
          <i className="fa fa-arrow-right"></i>
        </>
      );
    } else {
      return (
        <>
          <i className="fa fa-arrow-left"></i>
          <span className="ms-2 small hide-mobile">
            {templatesActive ? "Templates" : "Context"}
          </span>
        </>
      );
    }
  };

  const renderChangeSection = () => {
    let componentActive = false;
    if (smallDevice && isUserAdmin) componentActive = true;

    if (componentActive) {
      return (
        <button
          type="button"
          className="btn btn-primary ms-auto small"
          onClick={handleChangeSection}
        >
          {renderChangeSectionContent()}
        </button>
      );
    }
  };

  return (
    <div
      id="avatar"
      className="container-fluid py-1 pt-2 px-1 rounded-3 w-100 h-100 bg-white"
    >
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <h1 className={`mb-0 text-capitalize text-gradient d-inline-block`}>
            Avatars
          </h1>
          {renderLoading()}
          {renderChangeSection()}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default SingleAvatar;
