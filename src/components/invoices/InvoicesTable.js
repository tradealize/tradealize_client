import React from "react";
import InvoiceCard from "./InvoiceCard";
import useTranslations from "../../hooks/useTranslations";

const InvoicesTable = ({ invoices }) => {
  const translations = useTranslations();

  const renderInvoices = () => {
    if (Array.isArray(invoices)) {
      if (invoices.length <= 0) {
        return <p className="mt-3">No records found</p>;
      }
      return invoices.map((invoice) => (
        <InvoiceCard key={invoice.invoice_id} invoice={invoice} />
      ));
    }
  };

  return (
    <div className="table-responsive purchases-table">
      <table className="table">
        <thead>
          <tr className="bg-light text-dark border bold py-2">
            <th className="id">#ID</th>
            <th>{translations.invoices.product}</th>
            <th>{translations.invoices.status}</th>
            <th className="datetime">{translations.invoices.date}</th>
            <th>{translations.invoices.total}</th>
            <th>{translations.invoices.next}</th>
          </tr>
        </thead>
        <tbody>{renderInvoices()}</tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
