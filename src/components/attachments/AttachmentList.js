import React from "react";
import FilesService from "../../services/FilesService";
import AttachmentCard from "./AttachmentCard";

const AttachmentList = ({ attachments }) => {
  const handleSubmit = (file_id, file) => {
    const formData = FilesService.getFormData(file);
    FilesService.putFile(file_id, formData);
  };
  const renderAttachments = () => {
    if (Array.isArray(attachments)) {
      if (attachments.length > 0) {
        return attachments.map((attachment, index) => (
          <AttachmentCard
            key={index}
            attachment={attachment}
            handleSubmit={handleSubmit}
          />
        ));
      }
    }
    return <p>No attachments found.</p>;
  };
  return (
    <div className="container-fluid bg-light py-3">{renderAttachments()}</div>
  );
};

export default AttachmentList;
