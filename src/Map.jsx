import map from "./mer2.png";
import React, { useState } from "react";
import { scaleLinear } from "d3-scale";

const svgStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const Map = (props) => {
  const { width, height, dots } = props;
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(false);

  function convert(lat, lng) {
    let x = ((width * (180 + lng)) / 360) % width;
    lat = (lat * Math.PI) / 180;
    let y = Math.log(Math.tan(lat / 2 + Math.PI / 4));
    y = height / 2 - (width * y) / (2 * Math.PI) + 85;
    if (y != "Infinity") {
      return { x: x, y: y };
    }
    return { x: x, y: 0 };
  }

  const getName = (ele) => {
    if (!toggle) {
      console.log(ele);
      setName(ele);
      setToggle(true);
    } else {
      setName("");
      setToggle(false);
    }
  };

  const xScale = scaleLinear().domain([0, width]).range([0, width]);
  const yScale = scaleLinear().domain([0, height]).range([0, height]);
  let cord = { x: 0, y: 0 };

  return (
    <div className="mapContainer">
      <div className="info"><p>{name}</p></div>
      <div id="map">
        <img id="mapImg" src={map} alt="map background" />
        <svg
          style={svgStyles}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          {dots.map(
            (ele, i) => (
              (cord = convert(ele.latlng[0], ele.latlng[1])),
              (
                <circle
                  className="dots"
                  onClick={() => getName(ele.name)}
                  key={i}
                  cx={xScale(cord.x)}
                  cy={yScale(cord.y)}
                  r="3"
                  fill="red"
                />
              )
            )
          )}
        </svg>
      </div>
    </div>
  );
};

export default Map;
