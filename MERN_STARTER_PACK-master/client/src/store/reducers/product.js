import * as actionTypes from "../actionTypes";

const initialState = {
  products: [],
  productDetails: {},
  msg: "",
  style: "",
  validation: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
      break;

    
    case actionTypes.SAVE_PRODUCT:
      return {
        ...state,
        products: [state.products.concat(action.product)]
        // msg: "Saved,Click to continue",
        // style: "success",
        // validation: "success"
      };
      break;

    
  }
  return state;
};

export default reducer;
