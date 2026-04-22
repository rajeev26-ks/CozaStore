import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

// Product data with numeric prices and unique IDs
const productsData = [
  { id: 1, name: "Esprit Ruffle Shirt", price: 16.64, category: "women", image: "product-01.jpg" },
  { id: 2, name: "Herschel supply", price: 35.31, category: "women", image: "product-02.jpg" },
  { id: 3, name: "Only Check Trouser", price: 25.50, category: "men", image: "product-03.jpg" },
  { id: 4, name: "Classic Trench Coat", price: 75.00, category: "women", image: "product-04.jpg" },
  { id: 5, name: "Front Pocket Jumper", price: 34.75, category: "women", image: "product-05.jpg" },
  { id: 6, name: "Vintage Inspired Classic", price: 93.20, category: "watches", image: "product-06.jpg" },
  { id: 7, name: "Shirt in Stretch Cotton", price: 52.66, category: "women", image: "product-07.jpg" },
  { id: 8, name: "Pieces Metallic Printed", price: 18.96, category: "women", image: "product-08.jpg" },
  { id: 9, name: "Converse All Star Hi Plimsolls", price: 75.00, category: "shoes", image: "product-09.jpg" },
  { id: 10, name: "Femme T-Shirt In Stripe", price: 25.85, category: "women", image: "product-10.jpg" },
  { id: 11, name: "Herschel supply", price: 63.16, category: "men", image: "product-11.jpg" },
  { id: 12, name: "Herschel supply", price: 63.15, category: "men", image: "product-12.jpg" },
  { id: 13, name: "T-Shirt with Sleeve", price: 18.49, category: "women", image: "product-13.jpg" },
  { id: 14, name: "Pretty Little Thing", price: 54.79, category: "women", image: "product-14.jpg" },
  { id: 15, name: "Mini Silver Mesh Watch", price: 86.85, category: "watches", image: "product-15.jpg" },
  { id: 16, name: "Square Neck Back", price: 29.64, category: "women", image: "product-16.jpg" },
];

function Product() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("*");
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter products based on selected category
  const filteredProducts = productsData.filter(product => {
    if (activeFilter === "*") return true;
    return product.category === activeFilter;
  }).slice(0, visibleCount);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setVisibleCount(12);
  };

  const loadMore = () => setVisibleCount(prev => prev + 8);

  return (
    <div className="bg0 p-b-140">
      <div className="container">
        <div className="flex-w flex-sb-m p-b-52">
          {/* Filter Buttons */}
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            {[
              { label: "All Products", filter: "*" },
              { label: "Women", filter: "women" },
              { label: "Men", filter: "men" },
              { label: "Bag", filter: "bag" },
              { label: "Shoes", filter: "shoes" },
              { label: "Watches", filter: "watches" },
            ].map(({ label, filter }) => (
              <button
                key={filter}
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  activeFilter === filter ? "how-active1" : ""
                }`}
                onClick={() => handleFilterChange(filter)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search / Filter Toggle (UI only) */}
          <div className="flex-w flex-c-m m-tb-10">
            <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
              <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list" />
              <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
              Filter
            </div>
            <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
              <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
              <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
              Search
            </div>
          </div>

          {/* Search Panel (UI only) */}
          <div className="dis-none panel-search w-full p-t-10 p-b-15">
            <div className="bor8 dis-flex p-l-15">
              <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                <i className="zmdi zmdi-search" />
              </button>
              <input
                className="mtext-107 cl2 size-114 plh2 p-r-15"
                type="text"
                name="search-product"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Filter Panel (UI only) */}
          <div className="dis-none panel-filter w-full p-t-10">
            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
              {/* Sort By */}
              <div className="filter-col1 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Sort By</div>
                <ul>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">Default</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">Popularity</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">Average rating</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04 filter-link-active">Newness</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">Price: Low to High</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">Price: High to Low</a></li>
                </ul>
              </div>
              {/* Price */}
              <div className="filter-col2 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Price</div>
                <ul>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04 filter-link-active">All</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">$0.00 - $50.00</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">$50.00 - $100.00</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">$100.00 - $150.00</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">$150.00 - $200.00</a></li>
                  <li className="p-b-6"><a href="#" className="filter-link stext-106 trans-04">$200.00+</a></li>
                </ul>
              </div>
              {/* Color */}
              <div className="filter-col3 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Color</div>
                <ul>
                  <li className="p-b-6"><span className="fs-15 lh-12 m-r-6" style={{ color: "#222" }}><i className="zmdi zmdi-circle" /></span><a href="#" className="filter-link stext-106 trans-04">Black</a></li>
                  <li className="p-b-6"><span className="fs-15 lh-12 m-r-6" style={{ color: "#4272d7" }}><i className="zmdi zmdi-circle" /></span><a href="#" className="filter-link stext-106 trans-04 filter-link-active">Blue</a></li>
                </ul>
              </div>
              {/* Tags */}
              <div className="filter-col4 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Tags</div>
                <div className="flex-w p-t-4 m-r--5">
                  {["Fashion", "Lifestyle", "Denim", "Streetstyle", "Crafts"].map((tag, idx) => (
                    <a key={idx} href="#" className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">{tag}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row isotope-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category}`}>
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img src={`images/${product.image}`} alt={product.name} />
                  <button
                    onClick={() => addToCart(product)}
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                      {product.name}
                    </a>
                    <span className="stext-105 cl3">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                      <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="Wishlist" />
                      <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="Wishlist Active" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < productsData.filter(p => activeFilter === "*" ? true : p.category === activeFilter).length && (
          <div className="flex-c-m flex-w w-full p-t-45">
            <button onClick={loadMore} className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;