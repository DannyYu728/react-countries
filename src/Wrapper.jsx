import Navbar from "./Navbar";
import Map from "./Map";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const url = "https://country-api-production.up.railway.app/countries";
const mapHeight = 815;
const mapWidth = 1280;

function Wrapper() {
  const location = useLocation();
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    const getPage = async () => {
      let response = await axios(url);
      setInfos(response.data);
    };
    getPage();
  }, [location]);

  return (
    <div className="wrapper">
      <Navbar />
      <Map width={mapWidth} height={mapHeight} dots={infos} />
    </div>
  );
}

export default Wrapper;
