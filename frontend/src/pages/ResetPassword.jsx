import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../component/auth/AuthLayout";

// Password strength scorer
function scorePassword(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const capped = Math.min(score, 4);

    const colors = {
        0: "#e4e0d8",
        1: "#e74c3c",
        2: "#e67e22",
        3: "#f1c40f",
        4: "#1a7a4a",
    };

    const labels = {
        0: "",
        1: "Weak",
        2: "Fair",
        3: "Good",
        4: "Strong",
    };

    return { score: capped, color: colors[capped], label: labels[capped] };
}

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [pw, setPw] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const strength = scorePassword(pw);

    const API_URL = "http://localhost:8888"; // ✅ FIX (no Vite dependency)

    const validate = () => {
        if (!pw) return "Please enter a new password.";
        if (pw.length < 8) return "Password must be at least 8 characters.";
        if (!confirm) return "Please confirm your password.";
        if (pw !== confirm) return "Passwords do not match.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validate();
        if (err) return setError(err);

        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `${API_URL}/api/user/reset-password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newPassword: pw }),
                }
            );

            // ✅ SAFE JSON parsing (fixes "<!DOCTYPE html>" crash)
            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Server returned invalid response (not JSON)");
            }

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            navigate("/forgot-password/success");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmBorderColor =
        confirm.length === 0
            ? undefined
            : pw === confirm
            ? "var(--success)"
            : "var(--error)";

    return (
        <AuthLayout currentStep={3}>
            <div className="form-icon blue">🔒</div>

            <h1 className="form-title">New password</h1>
            <p className="form-subtitle">
                Create a strong password that you don't use on other sites.
            </p>

            {error && (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠</span>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Password */}
                <div className="field">
                    <label className="field-label">New password</label>

                    <div className="pw-wrap">
                        <input
                            type={showPw ? "text" : "password"}
                            className="field-input"
                            value={pw}
                            onChange={(e) => {
                                setPw(e.target.value);
                                setError("");
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPw(!showPw)}
                        >
                            {showPw ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* Strength */}
                    {pw && (
                        <div>
                            <div className="strength-row">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        style={{
                                            background:
                                                i <= strength.score
                                                    ? strength.color
                                                    : "#ddd",
                                        }}
                                    />
                                ))}
                            </div>

                            <span style={{ color: strength.color }}>
                                {strength.label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Confirm */}
                <div className="field">
                    <label className="field-label">Confirm password</label>

                    <input
                        type={showPw ? "text" : "password"}
                        className="field-input"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        style={{ borderColor: confirmBorderColor }}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update password →"}
                </button>
            </form>

            <button onClick={() => navigate("/login")}>
                ← Back to login
            </button>
        </AuthLayout>
    );
}