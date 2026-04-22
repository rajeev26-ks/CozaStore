import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // adjust path

function Header() {
  const { totalItems } = useCart(); // totalItems from context

  return (
    <header className="header-v4">
      {/* Header desktop */}
      <div className="container-menu-desktop">
        {/* Topbar */}
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>

            <div className="right-top-bar flex-w h-full">
              <Link to="/" className="flex-c-m trans-04 p-lr-25">
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
              <Link to="/" className="flex-c-m trans-04 p-lr-25">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            {/* Logo desktop */}
            <Link to="/" className="logo">
              <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
            </Link>

            {/* Menu desktop */}
            <div className="menu-desktop">
              <ul className="main-menu">
                <li className="active-menu">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">Shop</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Icon header */}
            <div className="wrap-icon-header flex-w flex-r-m">
              <Link
                to="/cart"
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify={totalItems}
              >
                <i className="zmdi zmdi-shopping-cart" />
              </Link>

              <Link
                to="/login"
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
              >
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Header Mobile */}
      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
            <i className="zmdi zmdi-search" />
          </div>

          <Link
            to="/cart"
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify={totalItems}
          >
            <i className="zmdi zmdi-shopping-cart" />
          </Link>

          <Link
            to="/wishlist"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify={0}
          >
            <i className="zmdi zmdi-favorite-outline" />
          </Link>
        </div>

        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className="menu-mobile">
        <ul className="topbar-mobile">
          <li>
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>
          </li>
          <li>
            <div className="right-top-bar flex-w h-full">
              <Link to="/help" className="flex-c-m p-lr-10 trans-04">
                Help &amp; FAQs
              </Link>
              <Link to="/account" className="flex-c-m p-lr-10 trans-04">
                My Account
              </Link>
              <Link to="/" className="flex-c-m p-lr-10 trans-04">
                EN
              </Link>
              <Link to="/" className="flex-c-m p-lr-10 trans-04">
                USD
              </Link>
            </div>
          </li>
        </ul>

        <ul className="main-menu-m">
          <li>
            <Link to="/">Home</Link>
            {/* Removed submenu for brevity, you can keep if needed */}
          </li>
          <li>
            <Link to="/product">Shop</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Modal Search */}
      <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div className="container-search-header">
          <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="images/icons/icon-close2.png" alt="CLOSE" />
          </button>
          <form className="wrap-search-header flex-w p-l-15">
            <button className="flex-c-m trans-04">
              <i className="zmdi zmdi-search" />
            </button>
            <input
              className="plh3"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;