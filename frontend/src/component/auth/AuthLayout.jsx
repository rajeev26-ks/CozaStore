// src/components/AuthLayout.jsx
import "../../styles/auth.css";

const STEPS = [
  { label: "Enter email" },
  { label: "Check inbox" },
  { label: "New password" },
  { label: "Done" },
];

const PANEL_TEXT = {
  1: { heading: "Forgot your password?", sub: "Don't worry — it happens to everyone. Enter your email and we'll send a secure link to reset it." },
  2: { heading: "Check your inbox", sub: "We've sent you a secure reset link. It's valid for 1 hour." },
  3: { heading: "Almost there", sub: "Create a new strong password to secure your account." },
  4: { heading: "You're all set!", sub: "Your password has been updated. You can now sign in with your new credentials." },
};

export default function AuthLayout({ children, currentStep = 1 }) {
  const panel = PANEL_TEXT[currentStep];

  return (
    <div className="auth-page">
      {/* ── Left decorative panel ── */}
      <aside className="auth-panel">
        <div className="panel-logo">YourApp</div>

        <div className="panel-content">
          <h2>{panel.heading}</h2>
          <p>{panel.sub}</p>
        </div>

        <div className="panel-steps">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`panel-step ${i + 1 < currentStep ? "done" : i + 1 === currentStep ? "active" : ""}`}
            >
              <div className="panel-step-dot" />
              {s.label}
            </div>
          ))}
        </div>
      </aside>

      {/* ── Right form section ── */}
      <main className="auth-form-section">
        <div className="auth-form-wrap">
          {/* Step progress pills */}
          <div className="step-indicator">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`step-pill ${
                  i + 1 < currentStep ? "done" : i + 1 === currentStep ? "active" : "pending"
                }`}
              />
            ))}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
