import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8888/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product ❌");
    }
  };

  return (
    <Layout>
      <section className="coza-container">
        <h2 className="coza-title">PRODUCTS</h2>

        <div className="coza-grid">
          {products.map((p) => (
            <div key={p._id} className="coza-card">
              <div className="coza-info">
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
              </div>

              <button
                className="coza-delete-btn"
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ CozaStore-style CSS */}
      <style>{`
        .coza-container {
          padding: 40px 20px;
          background: #f8f8f8;
          min-height: 100vh;
        }

        .coza-title {
          text-align: center;
          font-size: 22px;
          letter-spacing: 2px;
          margin-bottom: 30px;
          font-weight: 600;
        }

        /* Grid Layout */
        .coza-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        /* Product Card */
        .coza-card {
          background: #fff;
          border: 1px solid #e6e6e6;
          padding: 20px;
          border-radius: 4px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .coza-card:hover {
          transform: translateY(-5px);
        }

        .coza-info h3 {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .coza-info p {
          font-size: 14px;
          color: #666;
        }

        /* Delete Button */
        .coza-delete-btn {
          margin-top: 15px;
          padding: 10px;
          background: #222;
          color: #fff;
          border: none;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .coza-delete-btn:hover {
          background: #e74c3c;
        }

        /* 📱 Mobile */
        @media (max-width: 480px) {
          .coza-title {
            font-size: 18px;
          }

          .coza-card {
            padding: 15px;
          }
        }
      `}</style>
    </Layout>
  );
}