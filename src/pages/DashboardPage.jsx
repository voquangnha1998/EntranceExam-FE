import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import dashboardImage from '../dashboard.png';
import avatar from '../avata.png';
import powerImage from '../power.png';
import { Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "../styles/dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        className="d-flex justify-content-end align-items-center me-3 p-3 position-relative"
      >
        <div className="d-flex flex-column align-items-end pt-2 me-3">
          <span className="displayName">
            {auth.user?.displayName}
          </span>
          <span className="status">
            Available
          </span>
        </div>

        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction="down" >
          <DropdownToggle
            tag="div"
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
            className="d-flex align-items-center gap-2 cursor-pointer"
          >
            <img src={avatar} alt="Avatar" className="cursor-pointer" />
            <span>{auth.user?.name}</span>
          </DropdownToggle>

          <DropdownMenu right style={{ minWidth: '140px', marginTop: '15px' }}>
            <DropdownItem
              onClick={handleLogout}
              className="d-flex align-items-center justify-content-end gap-2"
            >
              Logout
              <img src={powerImage} alt="Logout icon" className="img-fluid" style={{ width: '16px', height: '16px' }} />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>

      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          backgroundColor: '#f9fafb',
          flexDirection: "column",
        }}
      >
        <Label className="text-left mb-5" style={{ fontSize: "24px", color: "#6E6B7B" }}>
          Welcome to Demo App
        </Label>
        <div style={{ maxWidth: '80%', maxHeight: '80%' }}>
          <img
            src={dashboardImage}
            alt="Demo content"
            className="img-fluid"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
