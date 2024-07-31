import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import '../css/navbar.css'; // Import the custom CSS file

function Navbar({ searchFn }) {
  const [searchStr, setSearchStr] = useState('');
  const navigate = useNavigate();

  const upStateSearch = (e) => {
    e.preventDefault();
    searchFn(searchStr);
  }

  const logout = () => {
    localStorage.clear();
    navigate('/?msg=logged_out');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm custom-navbar">
      <div className="container"> {/* Constrains the width of the navbar */}
        <Link className="navbar-brand" to="/hr">HR Dashboard</Link>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/employee-onboarding">Employee Onboarding</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/manager-onboarding">Manager Onboarding</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <span className="me-3" style={{color:"white"}}>Welcome, {localStorage.getItem('username')}</span>
            
            <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
