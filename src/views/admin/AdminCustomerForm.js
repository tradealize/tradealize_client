import React from "react";
import CustomerForm from "../../components/customers/CustomerForm";
import PanelTitle from "../../components/global/PanelTitle";
import useTranslations from "../../hooks/useTranslations";

const AdminCustomerForm = ({ user_id }) => {
  const translations = useTranslations();
  const formAdd = translations.admin.users.titleAdd;
  const formEdit = translations.admin.users.titleEdit;

  return (
    <div className="container-fluid">
      <PanelTitle
        title={`${isNaN(user_id) ? formAdd : formEdit}`}
      />
      <div className="card no-scale p-4">
        <CustomerForm customer_id={user_id} />
      </div>
    </div>
  );
};

export default AdminCustomerForm;
