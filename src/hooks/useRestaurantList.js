import { useState, useEffect } from "react";
import { fetchSwiggy } from "../utils/fetchSwiggy";
import { RESTAURANT_LIST_API } from "../utils/constants";

// cards[4] jaise hardcoded index ki jagah: jis card me restaurants hain wahi dhundho
const extractRestaurants = (json) => {
  const cards = json?.data?.cards || [];
  for (const c of cards) {
    const list = c?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(list) && list.length) return list;
  }
  return [];
};

const useRestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null); // null = loading
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const json = await fetchSwiggy(RESTAURANT_LIST_API);
        if (ignore) return;
        setRestaurants(extractRestaurants(json));
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return { restaurants, error };
};

export default useRestaurantList;
