import React from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useGlobalContext } from "./context";

const CartItem = ({ title, price, img, id, amount }) => {
  const { removeCart, increase, decrease, toggleCart } = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price}</h4>
        {/* remove btn */}
        <button className="remove-btn" onClick={() => removeCart(id)}>
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => toggleCart(id, "inc")}>
          <FiChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={() => toggleCart(id, "dec")}>
          <FiChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
