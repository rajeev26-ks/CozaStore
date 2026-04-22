import React, { useState } from "react";

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "cod",
  });

  const [cartItems] = useState([
    { id: 1, name: "White Shirt", price: 1200, qty: 1 },
    { id: 2, name: "Blue Jeans", price: 1800, qty: 1 },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Placed:", formData);
    alert("Your order has been placed successfully!");
  };

  return (
    <div className="bg0 p-t-75 p-b-85">
      <div className="container">
        <div className="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl">
          <h2 className="mtext-109 cl2 p-b-30">Checkout</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Billing Details */}
              <div className="col-md-7 col-lg-8 p-b-30">
                <h4 className="mtext-105 cl2 p-b-20">Billing Details</h4>

                <div className="row">
                  <div className="col-md-6 p-b-20">
                    <label>First Name *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 p-b-20">
                    <label>Last Name *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="p-b-20">
                  <label>Company Name</label>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="p-b-20">
                  <label>Country *</label>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="p-b-20">
                  <label>Street Address *</label>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 p-b-20">
                    <label>City *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 p-b-20">
                    <label>State *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 p-b-20">
                    <label>Pincode *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 p-b-20">
                    <label>Phone *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 p-b-20">
                    <label>Email *</label>
                    <input
                      className="stext-111 cl2 plh3 size-116 p-l-20 bor8"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="p-b-20">
                  <label>Order Notes</label>
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-20 p-tb-15 bor8"
                    name="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes about your order..."
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-md-5 col-lg-4 p-b-30">
                <div className="bor10 p-lr-30 p-t-30 p-b-30">
                  <h4 className="mtext-105 cl2 p-b-20">Your Order</h4>

                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Product</span>
                    </div>
                    <div className="size-209">
                      <span className="stext-110 cl2">Total</span>
                    </div>
                  </div>

                  {cartItems.map((item) => (
                    <div className="flex-w flex-t bor12 p-t-15 p-b-15" key={item.id}>
                      <div className="size-208">
                        <span className="stext-111 cl2">
                          {item.name} × {item.qty}
                        </span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex-w flex-t p-t-27 p-b-33">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Subtotal:</span>
                    </div>
                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">₹{subtotal}</span>
                    </div>
                  </div>

                  <div className="flex-w flex-t p-b-20">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Shipping:</span>
                    </div>
                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex-w flex-t bor12 p-t-15 p-b-25">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Total:</span>
                    </div>
                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">₹{total}</span>
                    </div>
                  </div>

                  <div className="p-t-20">
                    <h5 className="mtext-102 cl2 p-b-10">Payment Method</h5>

                    <div className="p-b-10">
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleChange}
                        />{" "}
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="p-b-20">
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={formData.paymentMethod === "online"}
                          onChange={handleChange}
                        />{" "}
                        Online Payment
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;