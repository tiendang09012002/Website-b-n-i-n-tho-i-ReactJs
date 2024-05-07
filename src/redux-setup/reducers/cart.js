import {
  ADD_TO_CART,
  UPDATE_TO_CART,
  DELETE_TO_CART,
  SUCCESS_CART,
} from "../../shared/constants/action-type";

const initState = {
  items: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action.payload);
    case UPDATE_TO_CART:
      return updateCart(state, action.payload);
    case DELETE_TO_CART:
      const items = state.items;
      const newCarts = items.filter((item) => item._id !== action.payload._id);
      return { ...state, items: newCarts };
    case SUCCESS_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const addToCart = (state, payload) => {
  const items = state.items;
  let isProductExists = false;
  items.map((item) => {
    if (item._id === payload._id) {
      item.qty = item.qty + payload.qty;
      isProductExists = true;
    }
    return item;
  });

  const newItems = isProductExists === true ? items : [...items, payload];
  return { ...state, items: newItems };
};

const updateCart = (state, payload) => {
  const items = state.items;
  const { _id, qty } = payload;
  const newCarts = items.map((item) => {
    if (item._id === _id) {
      item.qty = qty;
    }
    return item;
  });
  return { ...state, items: newCarts };
};
