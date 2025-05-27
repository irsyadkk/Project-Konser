import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/utils.js";

const RegisterPage = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [umur, setUmur] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (pass !== confirmPassword) {
      alert("Password and confirm password do not match!");
      return;
    }
    console.log("Register with", { nama, email, umur, pass });
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        nama,
        email,
        umur,
        pass,
      });
      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registrasi gagal !");
    }
  };

  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh", backgroundColor: "#1a1a1a", color: "white" }}
    >
      <div
        className="box"
        style={{ width: "384px", backgroundColor: "#2c2c2c" }}
      >
        <h2 className="title has-text-white has-text-centered">Register</h2>
        <input
          className="input mb-3"
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          className="input mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-3"
          type="number"
          placeholder="20"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
        />
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="button is-success is-fullwidth mb-3"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="has-text-centered">
          Sudah Punya Akun?{" "}
          <Link to="/login" className="has-text-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
