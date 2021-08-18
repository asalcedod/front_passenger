import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Cookies from "universal-cookie";

const NavMenu = () => {
  const cookies = new Cookies();
  const usr = cookies.get("form");
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    cookies.remove("form", { path: "/" });
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3">
        <Container>
          <NavbarBrand tag={Link} className="text-light" to="/">
            TRAVELS CO
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/Driver">
                  Drivers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/User">
                  User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-light"
                  to="/"
                  onClick={() => logout()}
                >
                  Logout
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
