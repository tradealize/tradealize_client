import React, { useContext, useEffect } from "react";
import { PurchasesContext } from "../context/PurchasesContext";
import { InvoicesContext } from "../context/InvoicesContext";
import InvoicesTable from "../components/invoices/InvoicesTable";
import PurchasesTable from "../components/purchases/PurchasesTable";
import { MenuContext } from "../context/MenuContext";

const Purchases = () => {
  const { purchases, getPurchases } = useContext(PurchasesContext);
  const { invoices, getInvoices } = useContext(InvoicesContext);
  const { setSelected } = useContext(MenuContext);

  useEffect(() => {
    getPurchases();
    getInvoices();
    setSelected("Billing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <div className="mx-0 row align-items-center my-3">
        <div className="container-fluid px-0">
          <h2>Purchases</h2>
        </div>
      </div>
      <div className="card shadow-sm p-3">
        <PurchasesTable purchases={purchases} />
      </div>
      <div className="mx-0 row align-items-center my-3">
        <div className="container-fluid px-0">
          <h2>Invoices</h2>
        </div>
      </div>
      <div className="card shadow-sm p-3">
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
};

export default Purchases;
