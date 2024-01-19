import React, { useContext, useState } from "react";
import { AnalyticsContext } from "../../context/AnalyticsContext";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import CustomersTable from "../../components/customers/CustomersTable";

const AnalyticsCustomers = () => {
  const [viewCustomers, setViewCustomers] = useState(null);
  const { signups, customers, cancelled, getSignUps } =
    useContext(AnalyticsContext);

  const renderCustomers = () => {
    if (viewCustomers !== null) {
      let renderCustomers = [];
      switch (viewCustomers) {
        case "nuevos":
          renderCustomers = signups;
          break;
        case "cancelados":
          renderCustomers = cancelled;
          break;
        default:
          renderCustomers = customers;
      }
      return (
        <div className="card p-3 ">
          {" "}
          <div className="row align-items-center mb-2">
            <div className="col-12 col-md-6">
              <h3 className="mb-0">
                <span className="text-capitalize">
                  {viewCustomers === "nuevos"
                    ? "Sign Ups"
                    : viewCustomers === "cancelados"
                    ? "Cancelled Customers"
                    : "Active Customers"}
                </span>
              </h3>
            </div>
            <div className="col-12 col-md-6 text-right">
              <button
                className="btn btn-link text-secondary"
                onClick={() => setViewCustomers(null)}
              >
                Ocultar
              </button>
            </div>
          </div>
          <CustomersTable
            customers={renderCustomers}
            showCancelReason={viewCustomers === "cancelados"}
          />
        </div>
      );
    }
  };

  const renderAmount = (data) => {
    if (Array.isArray(data)) {
      return data.length;
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid px-3 mb-3">
      <PanelTitleDate title="Customers" callback={getSignUps} />
      <div className="row mt-4">
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 ">
            <p className="bold">Sign Ups</p>
            <h3 className="mb-0">{renderAmount(signups)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("nuevos")}
            >
              Expand
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3  mb-4">
            <p className="bold">Active Customers</p>
            <h3 className="mb-0">{renderAmount(customers)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("activos")}
            >
              Expand
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 ">
            <p className="bold">Cancelled Customers</p>
            <h3 className="mb-0">{renderAmount(cancelled)}</h3>
            <button
              className="btn btn-link text-secondary text-left px-0 my-2"
              onClick={() => setViewCustomers("cancelados")}
            >
              Expand
            </button>
          </div>
        </div>
      </div>
      {renderCustomers()}
    </div>
  );
};

export default AnalyticsCustomers;
