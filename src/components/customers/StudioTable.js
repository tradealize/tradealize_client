import React from "react";
import StudioRow from "./StudioRow";

const StudioTable = ({ customers }) => {
  const renderCustomers = () => {
    if (Array.isArray(customers)) {
      if (customers.length === 0) {
        return (
          <tr>
            <td colSpan={5}>No hay clientes registradas.</td>
          </tr>
        );
      }
      return customers.map((customer) => <StudioRow customer={customer} />);
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
            <td>Restantes</td>
          </tr>
        </thead>
        <tbody>{renderCustomers()}</tbody>
      </table>
    </div>
  );
};

export default StudioTable;
