import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { useContext } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const AddPurchaseForm = ({
    customer,
    products,
    handleCancel,
    paymentMethods,
}) => {
    const [dias, setDias] = useState(0);
    const [gift, setGift] = useState(false);
    const [total, setTotal] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [product, setProduct] = useState(null);
    const [productID, setProductID] = useState(null);


    const { extenderAcceso } = useContext(CustomerContext);

    useEffect(() => {
        if (!products) {
            return
        }
        const current = products[0];

        if (current != null) {
            setProduct(current);
            setProductID(current.product_id);
            setDias(current.expiration_days);
            setTotal(current.price);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(() => {
        if (product !== null) {
            setPaymentMethod(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    useEffect(() => {
        if (Array.isArray(products)) {
            const current = products.find(
                (product) => product.product_id === parseInt(productID)
            );
            if (current) {
                setProduct(current);
                setDias(current.expiration_days);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productID]);

    const renderProducts = () => {
        if (!products) {
            return
        }

        return products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
                {product.name}
            </option>
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        extenderAcceso(
            {
                user_id: customer.user_id,
                product_id: productID,
                payment_method_id: paymentMethod,
                dias,
                gift,
                total,
            }
        );
    };

    const renderPaymentMethods = () => {
        if (Array.isArray(paymentMethods)) {
            return paymentMethods.map((payment_method) => (
                <option
                    key={payment_method.payment_method_id}
                    value={payment_method.payment_method_id}
                >
                    {payment_method.name}
                </option>
            ));
        }
    };

    return (
        <div className="container-fluid px-0">
            <form onSubmit={handleSubmit}>
                <label>product</label>
                <select
                    className="form-control mb-3"
                    onChange={(e) => setProductID(e.target.value)}
                >
                    {renderProducts()}
                </select>
                <label>Número de Días</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    value={dias}
                    onChange={(e) => setDias(e.target.value)}
                />
                <label>Total Pagado</label>
                <input
                    type="number"
                    className="form-control mb-3"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                />
                <label className="d-block">¿Es Regalo?</label>
                <Switch
                    checked={gift}
                    className="d-block mt-1 mb-3"
                    onChange={(checked) => setGift(checked)}
                />
                {!gift && (
                    <>
                        <label className="d-block">Método de Pago</label>
                        <select
                            className="form-control mb-3"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            {renderPaymentMethods()}
                        </select>
                    </>
                )}
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
                            className="btn btn-primary"
                            value="Extender Acceso"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPurchaseForm;
