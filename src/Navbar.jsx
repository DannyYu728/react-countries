import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.3rem;
  &:hover {
    color: rgba(151, 206, 76, 1);
  }
`;

const Title = styled.div`
  color: #97ce4c;
`;


function Navbar() {

  return (
    <div className="navBar">
      <NavbarLink to="/">
        <div>Home</div>
      </NavbarLink>
      <NavbarLink to="/map">
        <div>World Map</div>
      </NavbarLink>
      <NavbarLink to="/countries">
        <div>Countries</div>
      </NavbarLink>
    </div>
  );
}


export default Navbar;
