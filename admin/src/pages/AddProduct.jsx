import { useState } from "react";
import Layout from "../components/Layout";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:8888/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      alert("Product Added ✅");
      setForm({ name: "", price: "" });
    } catch {
      alert("Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="coza-container">
        <div className="coza-card">
          <h2 className="coza-title">ADD PRODUCT</h2>

          <form onSubmit={handleSubmit} className="coza-form">
            <div className="coza-input-box">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="coza-input-box">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="coza-btn"
              disabled={loading}
            >
              {loading ? "ADDING..." : "ADD PRODUCT"}
            </button>
          </form>
        </div>
      </section>

      {/* ✅ CozaStore-style CSS */}
      <style>{`
        .coza-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 85vh;
          background: #f8f8f8;
          padding: 20px;
        }

        .coza-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 40px 30px;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
        }

        .coza-title {
          text-align: center;
          font-size: 20px;
          letter-spacing: 2px;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .coza-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .coza-input-box input {
          width: 100%;
          padding: 14px;
          border: 1px solid #e6e6e6;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }

        .coza-input-box input:focus {
          border-color: #717fe0;
        }

        .coza-btn {
          background: #222;
          color: #fff;
          padding: 14px;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .coza-btn:hover {
          background: #717fe0;
        }

        .coza-btn:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        /* 📱 Responsive */
        @media (max-width: 480px) {
          .coza-card {
            padding: 25px 20px;
          }

          .coza-title {
            font-size: 18px;
          }
        }
      `}</style>
    </Layout>
  );
}