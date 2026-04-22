import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  // Helper to get full image URL
  const getImageUrl = (image) => `images/${image}`;

  if (cart.length === 0) {
    return (
      <div className="wrap-header-cart">
        <div className="header-cart flex-col-l p-l-65 p-r-25">
          <div className="header-cart-title flex-w flex-sb-m p-b-8">
            <span className="mtext-103 cl2">Your Cart</span>
          </div>
          <p>Your cart is empty</p>
          <Link to="/product" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap-header-cart">
      <div className="header-cart flex-col-l p-l-65 p-r-25">

        {/* Title */}
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
        </div>

        <div className="header-cart-content flex-w">

          {/* Cart Items */}
          <ul className="header-cart-wrapitem w-full">
            {cart.map((item) => (
              <li key={item.id} className="header-cart-item flex-w flex-t m-b-12">
                <div className="header-cart-item-img">
                  <img src={getImageUrl(item.image)} alt={item.name} />
                </div>

                <div className="header-cart-item-txt p-t-8">
                  <span className="header-cart-item-name m-b-18">
                    {item.name}
                  </span>

                  <div className="flex-w mt-2">
                    <span className="header-cart-item-info">
                      ${item.price.toFixed(2)} ×
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: "60px", marginLeft: "10px", textAlign: "center" }}
                    />
                    <span className="header-cart-item-info ml-2">
                      = ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginTop: "10px",
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "5px 12px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              Total: ${totalPrice}
            </div>

            {/* Buttons */}
            <div className="header-cart-buttons flex-w w-full">
              <Link
                to="/cart-page"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
              >
                Check Out
              </Link>
              <button
                onClick={clearCart}
                className="flex-c-m stext-101 cl0 size-107 bg-danger bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                style={{ backgroundColor: "#dc3545" }}
              >
                Clear Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;