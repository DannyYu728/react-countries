import Info from "./Info";
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
  const [info, setInfo] = useState({});
  const [toggle, setToggle] = useState(false);

  const delay = (duration) => {
    return new Promise((res) => {
      setTimeout(res, duration);
    });
  };

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

  const getInfo = async (ele) => {
    let main = document.querySelector(".info");
    if (!toggle) {
      main.classList.remove("hidden");
      setInfo(ele);
      setToggle(true);
    } else {
      main.classList.add("hidden");
      await delay(1000)
      setInfo({});
      setToggle(false);
    }
  };

  const xScale = scaleLinear().domain([0, width]).range([0, width]);
  const yScale = scaleLinear().domain([0, height]).range([0, height]);
  let cord = { x: 0, y: 0 };

  return (
    <div className="mapContainer">
      <Info info={info} />
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
                  onClick={() => getInfo(ele)}
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
