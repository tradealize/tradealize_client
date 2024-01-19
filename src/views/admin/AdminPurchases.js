import React, { useContext, useEffect, useState } from "react";
import PurchasesTable from "../../components/purchases/PurchasesTable";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { PurchasesContext } from "../../context/PurchasesContext";
import { ProductsContext } from "../../context/ProductsContext";
import Pagination from "../../components/global/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { InvoicesContext } from "../../context/InvoicesContext";
import moment from "moment";

const AdminPurchases = () => {
  const {
    purchases,
    getPurchasesAdmin,
    spinner: purchasesSpinner,
  } = useContext(PurchasesContext);
  const {
    invoices,
    getInvoices,
    spinner: invoicesSpinner,
  } = useContext(InvoicesContext);

  const { products, getAllProducts } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);

  const [page, setPage] = useState(0);
  const [type, setType] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [productId, setProductId] = useState(null);

  const [recordsData, setRecordsData] = useState([]);

  useEffect(() => {
    fetchPurchasesRecords();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (
      startDate !== "" &&
      endDate !== "" &&
      !purchasesSpinner &&
      !invoicesSpinner
    ) {
      fetchPurchasesRecords();
    }
  }, [startDate, endDate, productId, page, status, type, query]);


  useEffect(() => {
    if (!purchasesSpinner && !invoicesSpinner) {
      const current_records =
        type === "invoice"
          ? [...invoices]
          : type === "purchase"
            ? [...purchases]
            : [...invoices, ...purchases];

      current_records.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));
      setRecordsData(current_records);
    }
  }, [invoices, purchases]);

  const fetchPurchasesRecords = () => {
    const params = {
      page,
      query,
      status,
      product_id: productId,
      start_date: startDate,
      end_date: endDate,
    };

    if (type === "invoice" || type === null) {
      getInvoices(params);
    }

    if (type === "purchase" || type === null) {
      getPurchasesAdmin(params);
    }
  };

  const setDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const renderProducts = () => {
    if (Array.isArray(products)) {
      return [
        <option value="">All Products</option>,
        ...products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.name}
          </option>
        )),
      ];
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate title="Purchases" callback={setDates} />
      <div className="container-fluid px-0">
        <input
          type="text"
          value={query}
          className="form-control bg-white mb-3"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="card no-scale p-3 mb-3 shadow-sm">
        <div className="row align-items-center mb-3">
          <div className="col-12 col-md-6">
            <button
              className={`btn btn-sm btn-${status === "" ? "primary" : "light"
                } br-0`}
              onClick={() => setStatus("")}
            >
              All
            </button>
            <button
              className={`btn btn-sm btn-${Array.isArray(status) && status.includes("active")
                ? "primary"
                : "light"
                } br-0`}
              onClick={() => setStatus(["active", "completed", "success"])}
            >
              Successful
            </button>
            <button
              className={`btn btn-sm btn-${Array.isArray(status) && status.includes("cancelled")
                ? "primary"
                : "light"
                } br-0`}
              onClick={() => setStatus(["failed", "cancelled"])}
            >
              Failed
            </button>
            <button
              className={`btn btn-sm btn-${Array.isArray(status) && status.includes("processing")
                ? "primary"
                : "light"
                } br-0`}
              onClick={() => setStatus(["pending", "processing", "on-hold"])}
            >
              Pending
            </button>
          </div>
          <div className="col-12 col-md-3">
            <button
              className={`btn btn-sm btn-${type === null ? "primary" : "light"
                } br-0`}
              onClick={() => setType(null)}
            >
              All
            </button>
            <button
              className={`btn btn-sm btn-${type === "purchase" ? "primary" : "light"
                } br-0`}
              onClick={() => setType("purchase")}
            >
              Purchases
            </button>
            <button
              className={`btn btn-sm btn-${type === "invoice" ? "primary" : "light"
                } br-0`}
              onClick={() => setType("invoice")}
            >
              Invoices
            </button>
          </div>
          <div className="col-12 col-md-3">
            <select
              value={productId}
              className="form-control"
              onChange={(e) => setProductId(e.target.value)}
            >
              {renderProducts()}
            </select>
          </div>
        </div>

        <PurchasesTable
          showCustomer
          purchases={recordsData}
          user={user}
          showType
        />
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          itemsPerPage={12}
          totalItems={200}
        />
      </div>
    </div>
  );
};

export default AdminPurchases;
