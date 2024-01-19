import React, { useContext, useEffect, useState } from "react";
import { PaymentMethodsContext } from "../../context/PaymentMethodsContext";
import { PurchasesContext } from "../../context/PurchasesContext";
import Switch from "react-switch";

const cancelledStatus = ["cancelled", "revoked"];

const EditPurchaseForm = ({ handleCancel }) => {
    const [originalStatus, setOriginalStatus] = useState(null);
    const { purchase, updatePurchase, setPropertyPurchase } =
        useContext(PurchasesContext);

    const { payment_methods, getPaymentMethods } = useContext(PaymentMethodsContext);

    useEffect(() => {
        setOriginalStatus(purchase.status);
        getPaymentMethods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePurchase(purchase);
    };

    const renderWarning = () => {
        if (purchase.status === "cancelled" && purchase.status !== originalStatus) {
            return (
                <p>
                    Si Cancelas la compra, el cliente disfrutará sus beneficios hasta que
                    termine su vigencia y no se hará ningún cargo recurrente adicional.
                    Esta Acción NO puede deshacerse.
                </p>
            );
        }
        if (purchase.status === "cancelled" && purchase.status !== originalStatus) {
            return (
                <p>
                    Si Revocas la compra, el cliente dejará de tener acceso a los
                    beneficios de esta compra inmediatamente.
                </p>
            );
        }
        if (
            (purchase.status === "active" || purchase.status === "completed") &&
            originalStatus !== purchase.status
        ) {
            return (
                <p>
                    Si activas la compra, el cliente recibirá acceso a TBM Online y la
                    cantidad de créditos incluidas en el paquete inmediatamente.
                </p>
            );
        }
    };

    const renderButton = () => {
        if (
            cancelledStatus.includes(purchase.status) &&
            !cancelledStatus.includes(originalStatus)
        ) {
            return (
                <div className="row">
                    <div className="col-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn w-100 text-muted"
                        >
                            Cancelar
                        </button>
                    </div>
                    <div className="col-6">
                        <input
                            type="submit"
                            className="btn btn-danger"
                            value="Actualizar Compra"
                        />
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn w-100 text-muted"
                    >
                        Cancelar
                    </button>
                </div>
                <div className="col-6">
                    <input
                        type="submit"
                        className="btn w-100 btn-primary"
                        value="Guardar Compra"
                    />
                </div>
            </div>
        );
    };

    const renderPaymentMethods = () => {
        if (Array.isArray(payment_methods)) {
            return payment_methods.map((payment_method) => (
                <option
                    key={payment_method.payment_method_id}
                    value={payment_method.payment_method_id}
                >
                    {payment_method.name}
                </option>
            ));
        }
    };

    const renderReason = () => {
        if (purchase.status === "cancelled" && purchase.status !== originalStatus) {
            return (
                <div>
                    <label>Razón de Cancelación</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={purchase.cancel_reason}
                        onChange={(e) =>
                            setPropertyPurchase("cancel_reason", e.target.value)
                        }
                    />
                </div>
            );
        }
    };

    return (
        <div className="container-fluid px-0">
            <form onSubmit={handleSubmit}>
                <label>Días de Vigencia</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    value={purchase?.expiration_days}
                    onChange={(e) =>
                        setPropertyPurchase("expiration_days", e.target.value)
                    }
                />
                <label>Total Pagado</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    value={purchase.amount}
                    onChange={(e) => setPropertyPurchase("amount", e.target.value)}
                />

                <label className="d-block">¿Es Regalo?</label>
                <Switch
                    className="d-block mt-1 mb-3"
                    checked={purchase.is_gift || purchase.amount === 0}
                    onChange={(checked) => setPropertyPurchase("is_gift", checked)}
                />
                {!purchase.is_gift && (
                    <div>
                        <label className="d-block">Método de Pago</label>
                        <select
                            className="form-control mb-3"
                            value={purchase.payment_method_id}
                            onChange={(e) =>
                                setPropertyPurchase("payment_method_id", e.target.value)
                            }
                        >
                            {renderPaymentMethods()}
                        </select>
                    </div>
                )}
                <label>Estado</label>
                <select
                    className="form-control mb-3"
                    value={purchase.status}
                    onChange={(e) => setPropertyPurchase("status", e.target.value)}
                >
                    {!cancelledStatus.includes(originalStatus) && (
                        <>
                            <option value="active">Activa</option>
                            <option value="completed">Completada</option>
                            <option value="pending">Pendiente</option>
                        </>
                    )}
                    <option value="cancelled">Cancelada</option>
                    <option value="revoked">Revocada</option>
                </select>
                {renderReason()}
                {renderWarning()}
                {renderButton()}
            </form>
        </div>
    );
};

export default EditPurchaseForm;
