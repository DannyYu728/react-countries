import Navbar from "./Navbar";
import map from "./mer2.png";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scaleLinear } from "d3-scale";
import axios from "axios";
const url = "https://country-api-production.up.railway.app/countries";
const mapHeight = 815;
const mapWidth = 1280;

const svgStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

function Wrapper() {
  const location = useLocation();
  const [infos, setInfos] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const getPage = async () => {
      let response = await axios(url);
      setInfos(response.data);
    };
    getPage();
  }, [location]);

  function convert(lat, lng) {
    let x = ((mapWidth * (180 + lng)) / 360) % mapWidth;
    lat = (lat * Math.PI) / 180;
    let y = Math.log(Math.tan(lat / 2 + Math.PI / 4));
    y = mapHeight / 2 - (mapWidth * y) / (2 * Math.PI) + 85;
    if (y != "Infinity") {
      return { x: x, y: y };
    }
    return { x: x, y: 0 }
    
  }

  const getName = (ele) => {
    setName(ele)
  }

  const Map = ({ width, height, dots }) => {
    const xScale = scaleLinear().domain([0, width]).range([0, width]);
    const yScale = scaleLinear().domain([0, height]).range([0, height]);
    let cord = { x: 0, y: 0 }

    return (
      <div id="map">
        <img id="mapImg" src={map} alt="map background" />
        <svg
          style={svgStyles}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          debugger
          {dots.map((ele, i) => (
            cord = convert(ele.latlng[0], ele.latlng[1]),
            <circle
              onClick={() => getName(ele.name)}
              key={i}
              cx={xScale(cord.x)}
              cy={yScale(cord.y)}
              r="3"
              fill="red"
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <p>{ name }</p>
      <Map width={mapWidth} height={mapHeight} dots={infos} />
      <Navbar />
    </div>
  );
}

export default Wrapper;
