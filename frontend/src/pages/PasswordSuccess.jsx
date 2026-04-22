import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/auth/AuthLayout";

export default function PasswordSuccess() {
    const navigate = useNavigate();

    // Optional: auto redirect after few seconds (better UX)
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <AuthLayout currentStep={4}>
            <div className="centered">
                {/* Check icon */}
                <div className="check-ring">✓</div>

                <h1 className="form-title">Password updated!</h1>

                <p className="form-subtitle" style={{ marginBottom: "2rem" }}>
                    Your password has been reset successfully. You can now sign in with your new password.
                </p>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/login")}
                >
                    Continue to login →
                </button>

                <hr className="divider" />

                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.6,
                    }}
                >
                    For security, all other sessions have been logged out.
                </p>

                {/* Optional hint */}
                <p
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: "1rem",
                    }}
                >
                    Redirecting to login in 5 seconds...
                </p>
            </div>
        </AuthLayout>
    );
}