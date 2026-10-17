import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useRestaurantList from "../hooks/useRestaurantList";

const Body = () => {
  const { restaurants, error } = useRestaurantList();
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");

  // data aate hi filtered list bhi set karo
  useEffect(() => {
    if (restaurants) setFiltered(restaurants);
  }, [restaurants]);

  if (error) {
    return (
      <div className="status-box">
        <h2>Restaurants load nahi ho paaye 😔</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Dobara try karo</button>
      </div>
    );
  }

  if (restaurants === null) return <Shimmer count={20} />;

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search a restaurant you want..."
            className="searchBox"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() =>
              setFiltered(
                restaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                )
              )
            }
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => setFiltered(restaurants.filter((r) => r.info.avgRating > 4))}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="restaurants-container">
        {filtered.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
            <RestaurantCard resData={restaurant.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
