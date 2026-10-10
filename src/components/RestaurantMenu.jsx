import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShimmerMenu from './ShimmerMenu';
import { RES_CARD_LOGO, MENU_API } from '../utils/constants';
import { FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(false);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);
const fetchMenu = async () => {
  try {
    // Ab Swiggy ko direct nahi, apne local server ko call karo
    const response = await fetch(`http://localhost:5000/api/menu/${resId}`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("Data received:", json);
    
    if (!json?.data) {
      throw new Error("Invalid data format");
    }

    setResInfo(json.data);
  } catch (err) {
    console.error("Error fetching menu:", err.message);
    setError(true);
  }
};

  // --- Loading State (Shimmer) ---
  if (resInfo === null) return <ShimmerMenu />;

  // --- Safe Data Extraction (Hardcoded indices hata diye) ---
  const restaurantInfo = resInfo?.cards?.find(
    (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  )?.card?.card?.info;

  const regularCards = resInfo?.cards?.find(
    (card) => card?.groupedCard
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Recommended section ya pehla ItemCategory dhundho
  const itemCards = regularCards?.find(
    (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  )?.card?.card?.itemCards || [];

  // Destructure with fallback (agar koi field missing ho toh crash na ho)
  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, sla } = restaurantInfo || {};

  return (
    <div className="menu">
      <header className="menu-header">
        <div className="menu-header-left">
          <img src={RES_CARD_LOGO + cloudinaryImageId} alt="Restaurant Info" />
        </div>
        <div className="menu-header-right">
          <div className="top">
            <h1>{name}</h1>
            <h3>{cuisines?.join(', ')}</h3>
          </div>
          <div className="bottom">
            <h4 className="avg-rating">
              <span className="icons" style={{ position: 'relative', top: '2px', marginRight: '3px' }}>
                <AiOutlineStar />
              </span>
              <span>{avgRating}</span>
            </h4>
            <h4 className="time">
              <span className="icons" style={{ position: 'relative', top: '2px', marginRight: '3px' }}>
                <FiClock />
              </span>
              <span> {sla?.deliveryTime} MINS</span>
            </h4>
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      <div className="menu-main">
        <h2>Menu</h2>
        <h3 className="items">{itemCards.length} items</h3>
        <div className="menu-main-card-container">
          {itemCards.map((item) => (
            <div key={item.card.info.id} className="menu-card">
              <div className="menu-card-left">
                <h2 className="menu-name">{item.card.info.name}</h2>
                <h3 className="menu-price">
                  ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                </h3>
                <h4 className="menu-description">{item.card.info.description}</h4>
              </div>
              <div className="menu-card-right">
                <img src={RES_CARD_LOGO + item.card.info.imageId} alt="Menu Info" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;