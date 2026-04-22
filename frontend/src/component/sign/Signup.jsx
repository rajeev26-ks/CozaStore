import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked ✅");

    try {
      await axios.post(
        "http://localhost:8888/api/user/signup",
        form
      );

      toast.success("Signup successful ✅");
      setMessage("✅ Signup successful");

    } catch (error) {
      console.log(error);

      const errMsg =
        error.response?.data?.message || "Server error ❌";

      toast.error(errMsg);
      setMessage(errMsg);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        {/* Message */}
        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Button */}
          <button type="submit" style={styles.button}>
            Sign Up
          </button>

          {/* Login link */}
          <p style={styles.register}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

//////////////////////
// Internal CSS
//////////////////////

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f1f1"
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "35px 30px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#717fe0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    cursor: "pointer"
  },
  register: {
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center"
  },
  message: {
    textAlign: "center",
    marginBottom: "10px",
    color: "red"
  }
};