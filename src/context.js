import React, { useContext, useReducer, useEffect } from "react";
// import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  cart: [],
  amount: 0,
  total: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({
      type: "REMOVE_ALL",
    });
  };
  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: id,
    });
  };
  const increase = (id) => {
    dispatch({
      type: "INCREASE",
      payload: id,
    });
  };
  const decrease = (id) => {
    dispatch({
      type: "DECREASE",
      payload: id,
    });
  };
  const toggleCart = (id, type) => {
    dispatch({ type: "TOGGLE_CART", payload: { id, type } });
  };
  const getData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: "GET_DATA",
      payload: data,
    });
  };
  useEffect(() => {
    dispatch({ type: "LOADING" });
    let time = setTimeout(() => {
      getData();
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: "ADD_TOTAL",
    });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        increase,
        decrease,
        toggleCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
