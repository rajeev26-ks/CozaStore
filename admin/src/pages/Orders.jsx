import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/orders");
      setOrders(data);
      setError("");
    } catch (err) {
      console.error(err);
      // Differentiate between auth errors and others
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError("Failed to load orders. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Loading orders...</div></Layout>;
  if (error) return <Layout><div className="error">{error}</div></Layout>;

  return (
    <Layout>
      <section className="coza-container">
        <h2 className="coza-title">ORDERS</h2>

        {orders.length === 0 ? (
          <p className="empty">No orders found</p>
        ) : (
          <div className="coza-grid">
            {orders.map((o) => (
              <div key={o._id} className="coza-card">
                <div className="coza-info">
                  <p><span>User:</span> {o.userId?.name || "N/A"}</p>
                  <p><span>Email:</span> {o.userId?.email || "N/A"}</p>
                  <p><span>Total:</span> ₹{o.totalAmount}</p>
                  <p>
                    <span>Status:</span>{" "}
                    <span className={`status ${o.status}`}>
                      {o.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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
        .coza-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .coza-card {
          background: #fff;
          border: 1px solid #e6e6e6;
          padding: 20px;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .coza-card:hover {
          transform: translateY(-5px);
        }
        .coza-info p {
          font-size: 14px;
          margin-bottom: 8px;
          color: #555;
        }
        .coza-info span {
          font-weight: 600;
          color: #222;
        }
        .status {
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
          text-transform: uppercase;
        }
        .status.pending {
          background: #fff3cd;
          color: #856404;
        }
        .status.processing {
          background: #cce5ff;
          color: #004085;
        }
        .status.shipped {
          background: #d1ecf1;
          color: #0c5460;
        }
        .status.delivered {
          background: #d4edda;
          color: #155724;
        }
        .status.cancelled {
          background: #f8d7da;
          color: #721c24;
        }
        .empty {
          text-align: center;
          margin-top: 30px;
          color: #777;
        }
        .error {
          text-align: center;
          color: red;
          margin-top: 20px;
        }
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