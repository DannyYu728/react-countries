import React from "react";

const Info = (props) => {
  const { info } = props;

  return (
    <div className="info">
      <p>Name: {info.name}</p>
      <p>Capital: {info.capital}</p>
      <p>Continents: {info.continents}</p>
      <p>Population: {info.population}</p>
    </div>
  );
};

export default Info;
