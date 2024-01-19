import React, { useContext, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { ProductsContext } from "../context/ProductsContext";

const Pricing = ({ isHome }) => {
  const { products, getAllProducts } = useContext(ProductsContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderProducts = () => {
    if (Array.isArray(products)) {
      return products.map((product) => (
        <div
          key={product.product_id}
          className="col-12 col-md-6 col-lg-4 col-xl-3"
        >
          <ProductCard isHome={isHome} product={product} />
        </div>
      ));
    }
  };

  return (
    <div className="container py-5">
      <div className="container-fluid px-0 text-center text-black mb-4">
        <h1 className={`${isHome ? "text-white" : "text-dark"}`}>
          Pricing & Plans
        </h1>
      </div>
      <div className="row">{renderProducts()}</div>
    </div>
  );
};

export default Pricing;
