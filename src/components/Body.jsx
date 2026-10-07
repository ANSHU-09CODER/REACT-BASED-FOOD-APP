import { useState, useEffect } from "react";
import ResataurantsCards from "./Restaurantscards";
import Fakeui from "./Fakeui";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://proxy.corsfix.com/?/www.swiggy.com/dapi/restaurants/list/v5?lat=29.22480&lng=79.53130&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

          const json = await data.json();
    console.log(console.log(json?.data?.cards));

         const restaurants =
json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
    };

    return listOfRestaurants.length === 0 ? (
      <Fakeui></Fakeui>
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search a restaurant you want..."
                        className="searchBox"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            const filteredRestaurant = listOfRestaurants.filter((res) =>
                                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurant(filteredRestaurant);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="filter-btn"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (restaurant) => restaurant.info.avgRating > 4
                        );
                        setFilteredRestaurant(filteredList);
                    }}
                >
                    Top Rated Restaurant
                </button>
            </div>
            <div className="restaurants-container">
                {filteredRestaurant.map((restaurant) => (
                    <ResataurantsCards key={restaurant.info.id} resData={restaurant.info} />
                ))}
            </div>
        </div>
    );
};

export default Body;