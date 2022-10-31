import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";


function Navbar() {
  const [title, setTitle] = useState("");
  const { id } = useParams();

  return (
    <div className="navBar">
      <Link to="/">
        <div className="material-symbols-outlined">home</div>
      </Link>
      <Link to="/countries">
        <div className="material-symbols-outlined">Countries</div>
      </Link>
    </div>
  );
}

export default Navbar;
