import React from "react";
import OnlineRow from "./OnlineRow";

const OnlineTable = ({ customers }) => {
  const renderCustomers = () => {
    if (Array.isArray(customers)) {
      if (customers.length === 0) {
        return (
          <tr>
            <td colSpan={5}>No hay clientes registradas.</td>
          </tr>
        );
      }
      return customers.map((customer) => <OnlineRow customer={customer} />);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table border">
        <thead className="bg-light border bold small">
          <tr>
            <td className="td-id">#ID</td>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Teléfono</td>
            <td>Expiración</td>
          </tr>
        </thead>
        <tbody>{renderCustomers()}</tbody>
      </table>
    </div>
  );
};

export default OnlineTable;
