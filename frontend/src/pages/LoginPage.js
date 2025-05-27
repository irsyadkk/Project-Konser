import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/UseAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, pass);
      if (result) {
        if (email === "admin@gmail.com") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard", { state: { email: email } });
        }
      } else {
        setError("Email atau Password Salah !");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh", backgroundColor: "#1a1a1a", color: "white" }}
    >
      <div
        className="box"
        style={{ width: "320px", backgroundColor: "#2c2c2c" }}
      >
        <h2 className="title has-text-white has-text-centered">Log In</h2>
        <input
          className="input mb-3"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          className="button is-primary is-fullwidth mb-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="has-text-centered">
          Belum Punya Akun?{" "}
          <Link to="/register" className="has-text-link">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
