import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Product data array
const productsData = [
  { id: 1, name: 'Esprit Ruffle Shirt', price: 16.64, category: 'women', image: 'product-01.jpg' },
  { id: 2, name: 'Herschel supply', price: 35.31, category: 'women', image: 'product-02.jpg' },
  { id: 3, name: 'Only Check Trouser', price: 25.50, category: 'men', image: 'product-03.jpg' },
  { id: 4, name: 'Classic Trench Coat', price: 75.00, category: 'women', image: 'product-04.jpg' },
  { id: 5, name: 'Front Pocket Jumper', price: 34.75, category: 'women', image: 'product-05.jpg' },
  { id: 6, name: 'Vintage Inspired Classic', price: 93.20, category: 'watches', image: 'product-06.jpg' },
  { id: 7, name: 'Shirt in Stretch Cotton', price: 52.66, category: 'women', image: 'product-07.jpg' },
  { id: 8, name: 'Pieces Metallic Printed', price: 18.96, category: 'women', image: 'product-08.jpg' },
  { id: 9, name: 'Converse All Star Hi Plimsolls', price: 75.00, category: 'shoes', image: 'product-09.jpg' },
  { id: 10, name: 'Femme T-Shirt In Stripe', price: 25.85, category: 'women', image: 'product-10.jpg' },
  { id: 11, name: 'Herschel supply', price: 63.16, category: 'men', image: 'product-11.jpg' },
  { id: 12, name: 'Herschel supply', price: 63.15, category: 'men', image: 'product-12.jpg' },
  { id: 13, name: 'T-Shirt with Sleeve', price: 18.49, category: 'women', image: 'product-13.jpg' },
  { id: 14, name: 'Pretty Little Thing', price: 54.79, category: 'women', image: 'product-14.jpg' },
  { id: 15, name: 'Mini Silver Mesh Watch', price: 86.85, category: 'watches', image: 'product-15.jpg' },
  { id: 16, name: 'Square Neck Back', price: 29.64, category: 'women', image: 'product-16.jpg' },
];

function Product() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('*');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = productsData
    .filter(product => activeFilter === '*' ? true : product.category === activeFilter)
    .slice(0, visibleCount);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setVisibleCount(12);
  };

  const loadMore = () => setVisibleCount(prev => prev + 8);

  // Handler for adding product to cart with SweetAlert
  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  };

  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>
        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            {[
              { label: 'All Products', filter: '*' },
              { label: 'Women', filter: 'women' },
              { label: 'Men', filter: 'men' },
              { label: 'Bag', filter: 'bag' },
              { label: 'Shoes', filter: 'shoes' },
              { label: 'Watches', filter: 'watches' },
            ].map(({ label, filter }) => (
              <button
                key={filter}
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${activeFilter === filter ? 'how-active1' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="row isotope-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img src={`images/${product.image}`} alt={product.name} />
                  <button
                    onClick={() => handleAddToCart(product)} // Use the new handler
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <a href="#" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                      {product.name}
                    </a>
                    <span className="stext-105 cl3">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <a href="#" className="btn-addwish-b2 dis-block pos-relative">
                      <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                      <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < productsData.filter(p => activeFilter === '*' ? true : p.category === activeFilter).length && (
          <div className="flex-c-m flex-w w-full p-t-45">
            <button
              onClick={loadMore}
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;