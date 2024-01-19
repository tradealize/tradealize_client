import React, { useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import { AuthContext } from "../../context/AuthContext";

const CheckoutDiscount = ({ product_id }) => {
  const { user } = useContext(AuthContext);

  const { discountCode, setDiscountCode, spinnerDescuento, validarDescuento } =
    useContext(CheckoutContext);

  const handleSubmitDescuento = (e) => {
    e.preventDefault();
    validarDescuento(discountCode, product_id);
  };

  const renderDescuento = () => {
    if (user !== null) {
      return (
        <form className="card p-3" onSubmit={handleSubmitDescuento}>
          <label className="bold mb-1">Discount Code</label>
          <div className="row">
            <div className="col-12 col-lg-12">
              <input
                type="text"
                value={discountCode}
                className="form-control mb-2"
                onChange={(e) => setDiscountCode(e.target.value)}
              />
            </div>
            <div className="col-12 col-lg-12">
              <button
                type="submit"
                className="btn w-100 btn-sm btn-outline-primary"
                disabled={spinnerDescuento}
              >
                {spinnerDescuento ? (
                  <div className="spinner-border"></div>
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </form>
      );
    }
  };

  return <div>{renderDescuento()}</div>;
};

export default CheckoutDiscount;
