import { Link } from "@reach/router";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatMonto } from "../../utils";
import { getBilling } from "../../utils/class_package";
import { PurchasesContext } from "../../context/PurchasesContext";

const CurrentSubscription = () => {
  const { purchases } = useContext(PurchasesContext);
  const { user } = useContext(AuthContext);

  const renderSubscription = () => {
    if (user !== null) {
      if (Array.isArray(purchases)) {
        let current = purchases.find(
          (purchase) => purchase.status === "active"
        );
        if (current) {
          if (current.class_package !== null) {
            return (
              <div>
                <h4 className="h5">{current.class_package.title}</h4>
                <p>
                  ${formatMonto(current.amount)} USD {getBilling(current)}
                </p>
                <Link
                  to="/mypanel/shop"
                  className="btn btn-outline-primary w-100"
                >
                  Cambiar Plan
                </Link>
              </div>
            );
          }
        }
        return (
          <div>
            <p>No tienes un plan activo</p>
            <Link to="/mypanel/shop" className="btn btn-primary w-100">
              Elegir un Plan
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <div className="card p-3 bg-gray border my-3">
      <h3 className="h4 border-bottom pb-2">Mi Suscripción</h3>
      {renderSubscription()}
    </div>
  );
};

export default CurrentSubscription;
