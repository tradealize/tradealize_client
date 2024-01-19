import { PRODUCTS_RECEIVED, SET_PRODUCT } from "../types/products";

const ProductsReducer = (state, { type, payload }) => {
  switch (type) {
    case PRODUCTS_RECEIVED:
      return { ...state, products: payload };
    case SET_PRODUCT:
      return { ...state, product: payload };
    default:
      return { ...state };
  }
};
export default ProductsReducer;
