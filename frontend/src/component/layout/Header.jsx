import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext"; // ✅ added
import Swal from "sweetalert2";

function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth(); // ✅ get auth
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#717fe0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    });

    if (result.isConfirmed) {
      logout(); // ✅ context logout

      await Swal.fire({
        title: "Logged out",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/login");
    }
  };

  return (
    <header className="header-v4">
      <div className="container-menu-desktop">

        {/* Topbar */}
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>

            <div className="right-top-bar flex-w h-full">
              <Link to="/" className="flex-c-m trans-04 p-lr-25"><i className="fa-brands fa-facebook"></i></Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25"><i className="fa-brands fa-instagram"></i></Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25"><i className="fa-brands fa-linkedin"></i></Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25"><i className="fa-brands fa-youtube"></i></Link>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">

            <Link to="/" className="logo">
              <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
            </Link>

            <div className="menu-desktop">
              <ul className="main-menu">
                <li className="active-menu"><Link to="/">Home</Link></li>
                <li><Link to="/product">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Icons */}
            <div className="wrap-icon-header flex-w flex-r-m">

              {/* Cart */}
              <Link
                to="/cart"
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify={totalItems}
              >
                <i className="zmdi zmdi-shopping-cart" />
              </Link>

              {/* ✅ Login / Logout */}
              {isLoggedIn ? (
                <div
                  onClick={handleLogout}
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                  style={{ cursor: "pointer" }}
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                  title="Login"
                >
                  <i className="fa-solid fa-user"></i>
                </Link>
              )}

            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Header (unchanged except cart) */}
      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <Link
            to="/cart"
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify={totalItems}
          >
            <i className="zmdi zmdi-shopping-cart" />
          </Link>
        </div>
      </div>

    </header>
  );
}

export default Header;