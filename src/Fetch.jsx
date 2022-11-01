import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
const url = "https://country-api-production.up.railway.app/countries";

function Fetch() {
  const { id } = useParams();
  const location = useLocation();
  const [infos, setInfos] = useState([]);
  const [modalInfo, setModalInfo] = useState({});

  const delay = (duration) => {
    return new Promise((res) => {
      setTimeout(res, duration);
    });
  };

  useEffect(() => {
    const getPage = async () => {
      let response = await axios(`url`);
      setInfos(response.data.results);
    };
    getPage();
  }, [location]);

  return (
    <div className="page">
      <div className="display">
        {infos.map((ele, index) => {
          return (
            <div key={index} className="info">
              {(() => {
                if (id === "character") {
                  return <img src={ele.image} />;
                } else {
                  return <p>{ele.name}</p>;
                }
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fetch;
