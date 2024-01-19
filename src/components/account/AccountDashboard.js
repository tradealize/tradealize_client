import React, { useContext, useEffect } from "react";
import MiInformacion from "../../views/MiInformacion";
import { AuthContext } from "../../context/AuthContext";
import AccountMenu from "./AccountMenu";
import CurrentSubscription from "./CurrentSubscription";
import LegalMenu from "./LegalMenu";
import { ModalContext } from "../../context/ModalContext";
import { hideModal } from "../../utils";
import AccountDelete from "./AccountDelete";

const AccountDashboard = () => {
  const { user, signOut, deleteUser } = useContext(AuthContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const handleDelete = () => {
    hideModal();
    setTimeout(() => {
      modalComponent(
        "Confirmar Acción",
        <AccountDelete user={user} deleteUser={deleteUser} />
      );
    }, 500);
    setTimeout(() => {
      const myInput = document.getElementById("email");
      myInput.onpaste = (e) => e.preventDefault();
    }, 1000);
  };

  const confirmDelete = () => {
    modalComponent(
      "Caution",
      <div>
        <p>¿Estás seguro que deseas eliminar tu cuenta de My Realty Closer?</p>
        <p>
          Tu acceso quedará eliminado definitivamente, todas tus suscripciones
          se cancelarán y perderás acceso de inmediato.
        </p>
        <p>Esta acción NO se puede deshacer.</p>
        <div className="row my-3 align-items-center">
          <div className="col-6">
            <button
              className="btn btn-danger w-100 btn-sm"
              onClick={handleDelete}
            >
              <i className="fa fa-trash me-3"></i>Eliminar Cuenta
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-light w-100 btn-sm" onClick={hideModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container px-0 pb-5">
      <MiInformacion />
      <CurrentSubscription />
      <AccountMenu />
      <LegalMenu />
      <div className="card py-3 px-2 bg-gray border my-3">
        {" "}
        <button
          className="btn w-100 small hover-light py-1 px-2 text-left text-danger"
          onClick={signOut}
        >
          <i className="fa fa-sign-out-alt fa-flip-horizontal me-3"></i>Cerrar
          Sesión
        </button>
        <button
          className="btn w-100 small hover-light py-1 px-2 text-left text-danger mt-5"
          onClick={confirmDelete}
        >
          <i className="fa fa-trash fa-flip-horizontal me-3"></i>Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default AccountDashboard;
