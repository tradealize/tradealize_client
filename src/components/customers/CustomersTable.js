import React from "react";
import CustomerRow from "./CustomerRow";
import SortableHeader from "./SortableHeader";

const CustomersTable = ({
  customers,
  extraFields,
  setSort,
  selected,
  direction,
  setDirection,
  showCancelReason,
}) => {
  const renderCustomers = () => {
    if (Array.isArray(customers)) {
      if (customers.length === 0) {
        return (
          <tr className="text-dark">
            <td colSpan={5}>No customers available.</td>
          </tr>
        );
      }
      return customers.map((customer) => (
        <CustomerRow
          customer={customer}
          key={customer.user_id}
          extraFields={extraFields}
          showCancelReason={showCancelReason}
        />
      ));
    }
  };

  const renderExtraFields = () => {
    if (Array.isArray(extraFields)) {
      return extraFields.map((field) => <td>{field.label}</td>);
    }
    if (showCancelReason) {
      return <td>Reason</td>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table border">
        <thead className="bg-light border bold small">
          <tr>
            <SortableHeader
              column="customer_id"
              label="#ID"
              selected={selected}
              setSort={setSort}
              direction={direction}
              setDirection={setDirection}
            />
            <SortableHeader
              column="name"
              label="Name"
              selected={selected}
              setSort={setSort}
              direction={direction}
              setDirection={setDirection}
            />
            <SortableHeader
              column="email"
              label="Email"
              selected={selected}
              setSort={setSort}
              direction={direction}
              setDirection={setDirection}
            />
            <SortableHeader
              column="phone"
              label="Phone"
              setSort={setSort}
              selected={selected}
              direction={direction}
              setDirection={setDirection}
            />
            <SortableHeader
              column="birthdate"
              label="Birthday"
              setSort={setSort}
              selected={selected}
              direction={direction}
              setDirection={setDirection}
            />
            <SortableHeader
              column="value"
              label="LTV"
              setSort={setSort}
              selected={selected}
              direction={direction}
              setDirection={setDirection}
            />
            {renderExtraFields()}
          </tr>
        </thead>
        <tbody>{renderCustomers()}</tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
