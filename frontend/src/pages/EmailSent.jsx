import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../component/auth/AuthLayout";

export default function EmailSent() {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ safer fallback
    const email = location.state?.email;

    return (
        <AuthLayout currentStep={2}>
            <div className="form-icon orange">📬</div>

            <h1 className="form-title">Check your inbox</h1>

            <p className="form-subtitle">
                We sent a password reset link{" "}
                {email ? (
                    <>
                        to <strong>{email}</strong>
                    </>
                ) : (
                    <>to your email</>
                )}{" "}
                Open it and follow the steps below.
            </p>

            {/* Steps */}
            <div className="info-list">
                <div className="info-item">
                    <div className="info-num">1</div>
                    <p className="info-text">
                        Open the email from <strong>YourApp</strong> in your inbox.
                    </p>
                </div>

                <div className="info-item">
                    <div className="info-num">2</div>
                    <p className="info-text">
                        Click the <strong>Reset password</strong> link inside the email.
                    </p>
                </div>

                <div className="info-item">
                    <div className="info-num">3</div>
                    <p className="info-text">
                        Create a new password. The link expires in <strong>1 hour</strong>.
                    </p>
                </div>
            </div>

            {/* Help text */}
            <p
                style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    marginBottom: "1rem",
                    lineHeight: 1.6,
                }}
            >
                Didn’t get the email? Check spam/junk folder or try again.
            </p>

            {/* Resend button */}
            <button
                className="btn btn-ghost"
                onClick={() => navigate("/forgot-password")}
            >
                Resend reset link
            </button>

            <hr className="divider" />

            <button className="back-link" onClick={() => navigate("/login")}>
                ← Back to login
            </button>
        </AuthLayout>
    );
}