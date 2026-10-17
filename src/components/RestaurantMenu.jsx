import { useParams } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import { RES_CARD_LOGO } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { data, error } = useRestaurantMenu(resId);

  // Pehle error state set hota tha par kabhi dikhta nahi tha -> shimmer hamesha chalta tha
  if (error) {
    return (
      <div className="status-box">
        <h1>Oops! Menu load nahi ho paaya 😔</h1>
        <p>{error}</p>
      </div>
    );
  }
  if (!data) return <Shimmer count={12} />;

  const { info, items } = data;
  const { name, cuisines = [], costForTwoMessage, cloudinaryImageId, avgRating, sla } = info;

  return (
    <div className="menu">
      <header className="menu-header">
        <div className="menu-header-left">
          <img src={RES_CARD_LOGO + cloudinaryImageId} alt={name} />
        </div>
        <div className="menu-header-right">
          <div className="top">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ")}</h3>
          </div>
          <div className="bottom">
            <h4 className="avg-rating">
              <AiOutlineStar /> <span>{avgRating}</span>
            </h4>
            <h4 className="time">
              <FiClock /> <span>{sla?.deliveryTime} MINS</span>
            </h4>
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      <div className="menu-main">
        <h2>Menu</h2>
        <h3 className="items">{items.length} items</h3>
        <div className="menu-main-card-container">
          {items.map((item) => {
            const price = (item.price ?? item.defaultPrice ?? 0) / 100;
            return (
              <div key={item.id} className="menu-card">
                <div className="menu-card-left">
                  <h2 className="menu-name">{item.name}</h2>
                  <h3 className="menu-price">₹{price}</h3>
                  <h4 className="menu-description">{item.description}</h4>
                </div>
                <div className="menu-card-right">
                  {item.imageId && <img src={RES_CARD_LOGO + item.imageId} alt={item.name} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
