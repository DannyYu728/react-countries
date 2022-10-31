import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { scaleLinear } from "d3-scale";
import Navbar from "./Navbar";
import map from "./mer2.png";

const mapStyles = { position: "relative" };
const svgStyles = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 };

function Wrapper() {

  function convert(lat, lon){
    let y = ((-1 * lat) + 90) * (1304 / 180);
    let x = (lon + 180) * (2048 / 360);
    return {x:x,y:y};
}

  function Map({ width, height, dots }) {
    const xScale = scaleLinear()
      .domain([0, width])
      .range([0, width]);
    const yScale = scaleLinear()
      .domain([0, height])
      .range([0, height]);
  
    return (
      <div id="map" style={mapStyles}>
        <img src={map} alt="map background" />
        <svg
          style={svgStyles}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
  
          {dots.map((node, i) => (
            <circle
              key={i}
              cx={xScale(node.x)}
              cy={yScale(node.y)}
              r="1"
              fill="red"
            />
          ))}
        </svg>
      </div>
    );
  }
  
  const countries = [
    convert(40.7128, -73.0060),
    convert(42.8864, -78.8784)
 
    
    // { x: 20, y: 50,},
    // { x: 70, y: 70,},
    // { x: 15, y: 90 }
  ];

  return (
    <div className="wrapper">
     <Map width={2048} height={1304} dots={countries} />
      <Navbar />
    </div>
  );
}

export default Wrapper;
