import { Link } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import useTranslations from "../../hooks/useTranslations";

const CustomerForm = ({ customer_id }) => {
  const translations = useTranslations();

  const {
    spinner,
    customer,
    getCustomer,
    createUserNoSignUp,
    createCustomer,
    setCustomerProperty,
  } = useContext(CustomerContext);

  useEffect(() => {
    if (isNaN(customer_id)) {
      createCustomer();
    } else {
      getCustomer(customer_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserNoSignUp(customer);
  };

  const renderForm = () => {
    if (customer && customer !== null) {
      return (
        <form onSubmit={handleSubmit}>
          <label>{translations.admin.users.name}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.name}
            onChange={(e) => setCustomerProperty("name", e.target.value)}
          />
          <label>{translations.admin.users.lastName}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.last_name}
            onChange={(e) => setCustomerProperty("last_name", e.target.value)}
          />
          <label>{translations.admin.users.email}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.email}
            onChange={(e) => setCustomerProperty("email", e.target.value)}
          />
          <label>{translations.admin.users.phone}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.phone}
            onChange={(e) => setCustomerProperty("phone", e.target.value)}
          />
          <label>Instagram</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.instagram}
            onChange={(e) => setCustomerProperty("instagram", e.target.value)}
          />
          <label>{translations.admin.users.publicity}</label>
          <input
            type="text"
            className="form-control mb-3"
            value={customer.signup_reason}
            onChange={(e) =>
              setCustomerProperty("signup_reason", e.target.value)
            }
          />
          <div className="row">
            <div className="col-6">
              <button className="btn btn-primary">
                {spinner ? <div className="spinner-border"></div> : translations.admin.users.saveBtn}
              </button>
            </div>
            <div className="col-6 text-right">
              <Link
                to="/myadmin/customers"
                className="btn btn-link text-secondary"
              >
                {translations.admin.users.cancelBtn}
              </Link>
            </div>
          </div>
        </form>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return <div>{renderForm()}</div>;
};

export default CustomerForm;
