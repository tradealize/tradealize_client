import React, { useContext } from "react";
import moment from "moment";
import { AppConfigContext } from "../../context/AppConfigContext";
import useTranslations from "../../hooks/useTranslations";

const CustomerData = ({ customer, handleEdit }) => {
  const { S3_ENDPOINT, profile_placeholder } = useContext(AppConfigContext);
  
  const translations = useTranslations();
  const usersTranslations = translations.admin.users;

  const { file, name, last_name, birthdate, instagram, phone, email } =
    customer;

  const getSrc = () => {
    let src = profile_placeholder;
    if (file && file !== null) {
      src = `${file.name}.${file.type}`;
    }
    return `${S3_ENDPOINT}/${src}`;
  };

  return (
    <div className="container-fluid px-0">
      <div className="row mb-3 align-items-center mx-0">
        <div className="col-4 col-md-2 ps-0">
          <img
            src={getSrc()}
            className="w-100 border p-3 br-10 profile-image"
            alt="Perfil de cliente"
          />
        </div>
        <div className="col-8 col-md-10">
          <h4 className="mb-0">
            {name} {last_name}
          </h4>
        </div>
      </div>
      <div className="mb-1">
        <i className="fa fa-envelope me-3"></i>
        {email}
      </div>
      <div className="mb-1">
        <i className="fa fa-birthday-cake me-3"></i>
        {moment(birthdate).format("DD MMM YYYY")}
      </div>
      <div className="mb-1">
        <i className="fa fa-phone me-3"></i>
        {phone}
      </div>
      <div className="mb-1">
        <i className="fab fa-instagram me-3"></i>
        {instagram}
      </div>
      <button onClick={handleEdit} className="btn btn-outline-primary mt-3">
        <i className="fa fa-edit me-3"></i>{usersTranslations.edit}
      </button>
    </div>
  );
};

export default CustomerData;
