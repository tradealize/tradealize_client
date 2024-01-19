import React, { useContext, useEffect } from "react";
import { InvoicesContext } from "../../context/InvoicesContext";
import { PaymentMethodsContext } from "../../context/PaymentMethodsContext";
import { ModalContext } from "../../context/ModalContext";
import moment from "moment";

const InvoiceForm = ({ customer, invoice: invoiceToEdit }) => {
  const { invoice, clearInvoice, setInvoice, postInvoice, createInvoice, setPropertyInvoice } = useContext(InvoicesContext);
  const { payment_methods, getPaymentMethods } = useContext(
    PaymentMethodsContext
  );
  const { clearModal } = useContext(ModalContext);

  useEffect(() => {
    if (!invoiceToEdit) {
      createInvoice();
    } else {
      setInvoice(invoiceToEdit)
    }

    if (isNaN(invoice?.invoice_id)) {
      setPropertyInvoice("user_id", customer.user_id);
    }
    getPaymentMethods();
  }, []);


  const handleAttachPurchase = (purchase_id) => {
    let current_purchase = customer.purchases.find(
      (purchase) => parseInt(purchase?.purchase_id) === parseInt(purchase_id)
    );
    if (current_purchase) {
      setPropertyInvoice("amount", current_purchase.amount);
    }
    setPropertyInvoice("purchase_id", purchase_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postInvoice(invoice);
    handleCancel();
  };

  const handleCancel = () => {
    clearModal();
    clearInvoice();
  };

  const renderProduct = (purchase) => {
    if (purchase && purchase.product !== null) {
      let product = purchase.product;
      if (product && product !== null) {
        return product.name;
      }
    }
  };

  const renderPurchases = () => {
    if (Array.isArray(customer.purchases)) {
      return [
        <option value={null}>Sin compra</option>,
        ...customer.purchases.map((purchase) => (
          <option key={purchase.purchase_id} value={purchase.purchase_id}>
            #{purchase.purchase_id} - {renderProduct(purchase)}{" "}
            {moment(purchase.createdAt).format("DD MMM YYYY HH:mm")}
          </option>
        )),
      ];
    }
  };

  const renderPaymentMethods = () => {
    if (Array.isArray(payment_methods)) {
      return payment_methods.map((payment_method) => (
        <option
          key={payment_method.payment_method_id}
          value={payment_method.payment_method_id}
        >
          {payment_method.name}
        </option>
      ));
    }
  };

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <label>Compra</label>
        <select
          value={invoice?.purchase_id}
          key={invoice?.purchase_id}
          className="form-control mb-3"
          onChange={(e) => handleAttachPurchase(e.target.value)}
        >
          {renderPurchases()}
        </select>
        <label>Monto</label>
        <input
          type="number"
          className="form-control mb-3"
          value={invoice?.amount}
          onChange={(e) => setPropertyInvoice("amount", e.target.value)}
        />
        <label className="d-block">Método de Pago</label>
        <select
          className="form-control mb-3"
          value={invoice?.payment_method_id}
          onChange={(e) =>
            setPropertyInvoice("payment_method_id", e.target.value)
          }
        >
          {renderPaymentMethods()}
        </select>
        <label>Estado</label>
        <select
          className="form-control mb-3"
          value={invoice?.status}
          onChange={(e) => setPropertyInvoice("status", e.target.value)}
        >
          <option value="completed">Completado</option>
          <option value="active">Activo</option>
          <option value="pending">Pendiente</option>
          <option value="failed">Fallido</option>
        </select>
        <div className="row mt-3">
          <div className="col-6">
            <button type="submit" className="btn btn-primary">
              Guardar Cargo
            </button>
          </div>
          <div className="col-6 text-end">
            <button
              type="button"
              className="btn btn-link text-muted"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
