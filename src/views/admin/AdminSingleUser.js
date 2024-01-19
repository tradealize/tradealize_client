import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { ModalContext } from "../../context/ModalContext";
import PurchasesTable from "../../components/purchases/PurchasesTable";
import InvoicesTable from "../../components/invoices/InvoicesTable";
import PanelTitle from "../../components/global/PanelTitle";
import AddPurchaseForm from "../../components/purchases/AddPurchaseForm";
import CustomerData from "../../components/customers/CustomerData";
import CustomerActions from "../../components/customers/CustomerActions";
import { ProductsContext } from "../../context/ProductsContext";
import { PaymentMethodsContext } from "../../context/PaymentMethodsContext";
import { InvoicesContext } from "../../context/InvoicesContext";
import InvoiceForm from "../../components/invoices/InvoiceForm";
import useTranslations from "../../hooks/useTranslations";
import { navigate } from "@reach/router";

const AdminSingleUser = ({ user_id }) => {
  const { customer, getSingleCustomer } = useContext(CustomerContext);
  const { clearModal, modalComponent } = useContext(ModalContext);
  const { products, getAllProducts } = useContext(ProductsContext);
  const { payment_methods, getPaymentMethods } = useContext(
    PaymentMethodsContext
  );
  const { createInvoice } = useContext(InvoicesContext);

  const translations = useTranslations();
  const usersTranslations = translations.admin.users;

  useEffect(() => {
    getSingleCustomer(user_id);
  }, [user_id]);

  useEffect(() => {
    getAllProducts();
    getPaymentMethods();
  }, []);

  const addInvoice = () => {
    createInvoice();
    modalComponent("Agregar Cargo", <InvoiceForm customer={customer} />);
  };

  const toggleModal = () => {
    if (!customer) {
      return;
    }
    modalComponent(
      "Agregar Acceso",
      <AddPurchaseForm
        customer={customer}
        products={products}
        handleCancel={clearModal}
        paymentMethods={payment_methods}
      />
    );
  };

  const renderUsuario = () => {
    if (customer && customer !== null) {
      return (
        <div className="row">
          <div className="col-12 col-md-6">
            <CustomerData
              customer={customer}
              handleEdit={() => navigate(`users/${user_id}/edit`)}
            />
          </div>
          <div className="col-12 col-md-6">
            <CustomerActions customer={customer} />
          </div>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <div className="row pb-2 border-bottom mx-0 mb-3 align-items-center">
        <div className="col col-md-6 ps-0">
          <h1>{usersTranslations.customer}</h1>
        </div>
        <div className="col col-md-6 pe-0 text-end"></div>
      </div>

      <div
        className="row position-relative"
        style={{ overflowY: "auto", flex: 1 }}
      >
        <div className="card mb-3 p-3">{renderUsuario()}</div>
        <div className="card p-3 pb-1  my-3">
          <PanelTitle
            title={usersTranslations.purchases}
            onClick={toggleModal}
          />
          <PurchasesTable
            showCustomer={false}
            purchases={customer !== null ? customer.purchases : []}
          />
        </div>
        <div className="card p-3 pb-1 no-scale mt-3">
          <PanelTitle title={usersTranslations.invoices} onClick={addInvoice} />
          <InvoicesTable
            invoices={customer !== null ? customer.invoices : []}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button className="btn btn-outline-danger mt-3">
            <i className="fa fa-trash me-2"></i>
            {usersTranslations.delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleUser;
