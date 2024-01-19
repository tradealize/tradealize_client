import React, { useReducer, createContext } from "react";
import ProductsReducer from "../reducers/ProductsReducer";
import { PRODUCTS_RECEIVED, SET_PRODUCT } from "../types/products";
import ProductsService from "../services/ProductsService";

const initialState = {
  products: null,
  product: null,
};

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getPAvailableProducts = (filters) => {
    ProductsService.getAvailableProducts(filters).then((res) => {
      const { products } = res.data;
      dispatch({ type: PRODUCTS_RECEIVED, payload: products });
    });
  };

  const getAllProducts = (filters) => {
    ProductsService.getAllProducts(filters).then((res) => {
      const { products } = res.data;
      dispatch({ type: PRODUCTS_RECEIVED, payload: products });
    });
  };

  const setProduct = (product) => {
    dispatch({ type: SET_PRODUCT, payload: product });
  };

  const clearProduct = () => {
    dispatch({ type: SET_PRODUCT, payload: null });
  };

  const clearProducts = () => {
    dispatch({ type: PRODUCTS_RECEIVED, payload: null });
  };

  const getSingleProduct = (product_id) => {
    ProductsService.getSingleProduct(product_id).then((res) => {
      const { product } = res.data;
      dispatch({ type: SET_PRODUCT, payload: product });
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        setProduct,
        getPAvailableProducts,
        getAllProducts,
        clearProduct,
        clearProducts,
        getSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
