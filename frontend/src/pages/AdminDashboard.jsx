import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/utils";
import useAuth from "../auth/UseAuth";

function Dashboard() {
  const [user, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "";
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const fetchUserName = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserName(res.data.data.nama);
      localStorage.setItem("userName", res.data.data.nama);
    } catch (error) {
      setUserName("");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch Users:", error);

      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          const res = await axios.get(`${BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          setUsers(res.data.data);
        } else {
          console.error("Failed to refresh token. Redirect to login.");
        }
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = user.filter((user) =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUser();
    if (userEmail && !userName) fetchUserName();
  }, [userEmail]);

  return (
    <div>
      <nav
        className="navbar is-dark-grey"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <span className="navbar-item has-text-weight-bold is-size-5">
            Hello, {userName} !
          </span>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={handleLogout}
              className="button is-danger is-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <div className="box">
            <div className="level mb-4">
              <div className="level-left">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="level-right">
                <Link to={"add"} className="button is-info">
                  + Add Note
                </Link>
              </div>
            </div>

            <table className="table is-striped is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="has-text-centered has-text-grey">
                      No notes found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((note) => (
                    <tr key={note.id}>
                      <td>{note.title}</td>
                      <td>
                        <Link
                          to={`detail/${note.id}`}
                          className="button is-info is-small"
                        >
                          See
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
