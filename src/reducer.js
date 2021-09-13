const reducer = (state, action) => {
  if (action.type === "REMOVE_ALL") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_CART") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tempcart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: tempcart };
  }
  if (action.type === "DECREASE") {
    let newItem = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((el) => el.amount !== 0);
    return { ...state, cart: newItem };
  }
  if (action.type === "ADD_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (acc, el) => {
        const { amount, price } = el;
        let newTotal = amount * price;
        acc.total += newTotal;
        acc.amount += amount;
        return acc;
      },
      {
        amount: 0,
        total: 0,
      }
    );
    total = total.toFixed(1);
    return { ...state, amount, total };
  }
  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
  }
  if (action.type === "GET_DATA") {
    return { ...state, cart: action.payload, isLoading: false };
  }
  if (action.type === "TOGGLE_CART") {
    let newCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((el) => el.amount !== 0);
    return { ...state, cart: newCart };
  }
  throw new Error("The action type does not exist");
};

export default reducer;
