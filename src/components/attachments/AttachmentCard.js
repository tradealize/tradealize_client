import React, { useEffect, useState } from "react";
import { IonItem } from "@ionic/react";
import IconItem from "../global/IconItem";

const AttachmentCard = ({ attachment, handleSubmit }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file !== null) {
      if (typeof handleSubmit === "function") {
        handleSubmit(attachment.file_id, file);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleClick = () => {
    let input = document.getElementById(`input-${attachment.name}`);
    if (input) input.click();
  };

  const renderFile = () => {
    if (attachment && attachment !== null) {
      if (attachment.file_id === null) {
        return (
          <button
            onClick={handleClick}
            className="btn btn-link no-decoration text-muted px-0 py-0"
          >
            <IconItem icon="upload text-muted" name={attachment.name} />
            <input
              type="file"
              id={`input-${attachment.name}`}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ visibility: "hidden", position: "absolute" }}
            />
          </button>
        );
      }
      return <IconItem icon="file text-primary" name={attachment.name} />;
    }
  };

  return (
    <IonItem
      lines="none"
      className="card shadow-sm text-dark no-decoration p-2 px-0 mb-3"
    >
      {renderFile()}
    </IonItem>
  );
};

export default AttachmentCard;
