import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import CustomersTable from "../../components/customers/CustomersTable";
import Pagination from "../../components/global/Pagination";
import { CustomerContext } from "../../context/CustomerContext";
import useTranslations from "../../hooks/useTranslations";

const AdminUsers = () => {
  const [sort, setSort] = useState("name");
  const [field, setField] = useState("");
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const [query, setQuery] = useState("");
  const { customers, getAllCustomers } = useContext(CustomerContext);

  const translations = useTranslations();
  const usersTranslations = translations.admin.users;

  useEffect(() => {
    getAllCustomers({ page });
  }, []);

  useEffect(() => {
    getAllCustomers({ query, page, field, sort, direction });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, field, sort, direction]);

  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <div className="row mx-0 align-items-center mb-3 border-bottom">
        <div className="col-12 col-md-3 ps-0">
          <h1>Users</h1>
        </div>
        <div className="col-12 col-lg-9 px-0 align-items-center" >
          <div className="row">
            <div className="col-12 col-lg-8 mb-3">
              <div className="row">
                <div className="col-8 pr-0">
                  <input
                    type="text"
                    className="form-control bg-white"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="col-4 pl-0">
                  <select
                    className="form-control bg-white"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    style={{minWidth: '75px'}}
                  >
                    <option value="">{usersTranslations.all}</option>
                    <option value="name">{usersTranslations.name}</option>
                    <option value="last_name">{usersTranslations.lastName}</option>
                    <option value="email">{usersTranslations.email}</option>
                    <option value="phone">{usersTranslations.phone}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4 col-lg-4 text-right" style={{minWidth: '145px'}}>
              <Link to="new/edit" className="btn btn-primary w-100">
                + {usersTranslations.addBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3" style={{overflowY: 'auto'}}>
        <CustomersTable
          customers={customers}
          setSort={setSort}
          direction={direction}
          selected={sort}
          setDirection={setDirection}
        />
        <Pagination
          size={12}
          currentPage={page}
          onPageChange={setPage}
          itemsPerPage={24}
          totalItems={200}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
