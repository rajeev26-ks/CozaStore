import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Ensure totalPrice is a number (context may return string)
  const subtotal = typeof totalPrice === 'number' ? totalPrice : parseFloat(totalPrice) || 0;
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  // Helper for image path
  const getImageUrl = (image) => `images/${image}`;

  if (cart.length === 0) {
    return (
      <div className="bg0 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2"></th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                        <th className="column-6">Remove</th>
                       </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center p-4">
                          Your cart is empty.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg0 p-t-75 p-b-85">
      <div className="container">
        <div className="row">
          {/* Cart Table */}
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
            <div className="m-l-25 m-r--38 m-lr-0-xl">
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <thead>
                    <tr className="table_head">
                      <th className="column-1">Product</th>
                      <th className="column-2"></th>
                      <th className="column-3">Price</th>
                      <th className="column-4">Quantity</th>
                      <th className="column-5">Total</th>
                      <th className="column-6">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr className="table_row" key={item.id}>
                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src={getImageUrl(item.image)} alt={item.name} />
                          </div>
                        </td>
                        <td className="column-2">{item.name}</td>
                        <td className="column-3">₹{item.price.toFixed(2)}</td>
                        <td className="column-4">
                          <div className="wrap-num-product flex-w m-l-auto m-r-0">
                            <div
                              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fs-16 zmdi zmdi-minus" />
                            </div>
                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              value={item.quantity}
                              readOnly
                            />
                            <div
                              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fs-16 zmdi zmdi-plus" />
                            </div>
                          </div>
                        </td>
                        <td className="column-5">₹{(item.price * item.quantity).toFixed(2)}</td>
                        <td className="column-6">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon Section (UI only) */}
              <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                <div className="flex-w flex-m m-r-20 m-tb-5">
                  <input
                    className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-tb-5"
                    type="text"
                    name="coupon"
                    placeholder="Coupon Code"
                  />
                  <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                    Apply Coupon
                  </div>
                </div>
                <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                  Update Cart
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
            <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
              <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

              <div className="flex-w flex-t bor12 p-b-13">
                <div className="size-208">
                  <span className="stext-110 cl2">Subtotal:</span>
                </div>
                <div className="size-209">
                  <span className="mtext-110 cl2">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                <div className="size-208 w-full-ssm">
                  <span className="stext-110 cl2">Shipping:</span>
                </div>
                <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                  <span className="mtext-110 cl2">
                    {shipping === 0 ? "Free Shipping" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex-w flex-t p-t-27 p-b-33">
                <div className="size-208">
                  <span className="mtext-101 cl2">Total:</span>
                </div>
                <div className="size-209 p-t-1">
                  <span className="mtext-110 cl2">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;