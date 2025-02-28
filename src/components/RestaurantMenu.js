import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log(json);

    setResInfo(json.data);
  };

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.info;

  const { itemcards } =
    resInfo?.data?.cards[4]?.gropuedCard?.cardGroupMap?.REGULAR?.cards?.card
      ?.card;

  return (
    <div className="menu">
      <h1> {name} </h1>{" "}
      <p>
        {cuisines.join(",")} - {costForTwoMessage}{" "}
      </p>
      <ul>
        <li>{itemcards[3].card.info.name}</li>
        <li>Burgers </li>
        <li>Diet coke </li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
