import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const { isAuthenticated, user, loading, logout } = useAuthContext();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <button className="btn btn-primary m-1" type="button">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-success m-1" type="button">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-2">{user?.name}</p>
                  <button onClick={logout} className="btn btn-primary">
                    Logout
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
