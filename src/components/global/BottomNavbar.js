import { Link } from "@reach/router";
import React, { useContext } from "react";
import { CapacitorContext } from "../../context/CapacitorContext";
import bunny from "../../assets/bunny.png";
import { hasNotch } from "../../utils";

const BottomNavbar = () => {
  const { device, platform } = useContext(CapacitorContext);
  return (
    <div
      className={`container-fluid bottom-navbar show-mobile bg-white shadow border ${
        platform === "ios" && hasNotch(device) ? "pb-4" : ""
      }`}
    >
      <div className="container px-0">
        <div className="row">
          <div className="col-3 text-center">
            <Link to="/" className="btn btn-link w-100 p-3">
              <i className="fa fa-brain" />
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link to="/conversations" className="btn btn-link w-100 p-3">
              <img
                className="mx-2 d-inline-block"
                style={{ maxWidth: 35 }}
                alt="Bemodo Fetch"
                src={bunny}
              />
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link to="/billing" className="btn btn-link w-100 p-3">
              <i className="fa fa-credit-card" />
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link to="/settings" className="btn btn-link w-100 p-3">
              <i className="fa fa-cog" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
