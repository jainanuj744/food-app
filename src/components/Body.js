import { useState, useEffect } from "react";

const Cards = (props) => {
  return (
    <div className="res-card">
      <img className="card-logo" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${props.logo}`} alt="No img" />
      <h4 className="com">{props.resName}</h4>
      <h5 className="com">{props.cuisine}</h5>
      <h6 className="com">{props.rating}</h6>
      <h6 className="com">{props.eta}</h6>
    </div>
  );
};

// let objList = [];

const Body = () => {
  let [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dta = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9844579&lng=77.74981679999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await dta.json();
    let nest =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    // console.log(nest)
    setResList(nest);
  };

  console.log(resList);
  return (
    <div className="body">
      <div className="search">
        <input className="search-bar"></input>
      </div>
      <div className="res-ct">
        {resList.map((nest) => (
          <Cards
            key={nest.info.name}
            logo={nest.info.cloudinaryImageId}
            resName={nest.info.name}
            cuisine={nest.info.cuisines[0]}
            rating={nest.info.avgRating}
            eta={nest.info.sla.deliveryTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
