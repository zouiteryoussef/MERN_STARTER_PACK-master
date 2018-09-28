import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Badge, Glyphicon } from "react-bootstrap";
import "C:/Users/ASUS/Downloads/MERN_STARTER_PACK-master/MERN_STARTER_PACK-master/client/src/Styles.css";

class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img
                src="../images/happyshop.png"
                style={{ width: 170 }}
                alt=""
              />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight id="menuCollapse">
            <NavLink to="/" className="menuLink" id="menuProducts">
              Products
            </NavLink>

            <NavLink to="/admin" className="menuLink" id="menuAdmin">
              Admin
            </NavLink>
            
           
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}



export default Menu;
