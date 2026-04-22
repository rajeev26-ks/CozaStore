import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/auth/AuthLayout";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    setError("");
    setLoading(true);

    try {
      // ✅ FIX: backend URL (no Vite dependency issues)
      const API_URL = "http://localhost:8888";

      const res = await fetch(`${API_URL}/api/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      // ✅ SAFE JSON handling (prevents "<!DOCTYPE" crash)
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned invalid response (not JSON)");
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      // success → navigate
      navigate("/forgot-password/email-sent", {
        state: { email: email.trim() },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout currentStep={1}>
      <div className="form-icon orange">🔑</div>

      <h1 className="form-title">Reset password</h1>

      <p className="form-subtitle">
        Enter the email address linked to your account and we'll send you a password reset link.
      </p>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            type="email"
            className={`field-input ${error ? "error-input" : ""}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoComplete="email"
            autoFocus
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending link…" : "Send reset link →"}
        </button>
      </form>

      <button className="back-link" onClick={() => navigate("/login")}>
        ← Back to login
      </button>
    </AuthLayout>
  );
}