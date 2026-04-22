import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8888/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => alert("Failed to load stats ❌"));
  }, []);

  return (
    <Layout>
      <section className="coza-container">
        <h2 className="coza-title">DASHBOARD</h2>

        <div className="coza-grid">
          <div className="coza-card">
            <h3>Products</h3>
            <p>{stats.products}</p>
          </div>

          {/* <div className="coza-card">
            <h3>Users</h3>
            <p>{stats.users}</p>
          </div> */}

          <div className="coza-card">
            <h3>Orders</h3>
            <p>{stats.orders}</p>
          </div>
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        /* Card */
        .coza-card {
          background: #fff;
          border: 1px solid #e6e6e6;
          padding: 30px 20px;
          text-align: center;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .coza-card:hover {
          transform: translateY(-5px);
        }

        .coza-card h3 {
          font-size: 14px;
          letter-spacing: 1px;
          margin-bottom: 10px;
          color: #555;
        }

        .coza-card p {
          font-size: 26px;
          font-weight: 600;
          color: #222;
        }

        /* 📱 Mobile */
        @media (max-width: 480px) {
          .coza-title {
            font-size: 18px;
          }

          .coza-card {
            padding: 20px;
          }

          .coza-card p {
            font-size: 22px;
          }
        }
      `}</style>
    </Layout>
  );
}