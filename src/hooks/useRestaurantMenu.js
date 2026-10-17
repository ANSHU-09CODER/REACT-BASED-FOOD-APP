import { useState, useEffect } from "react";
import { fetchSwiggy } from "../utils/fetchSwiggy";
import { MENU_API } from "../utils/constants";

const RESTAURANT_TYPE = "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
const ITEM_CATEGORY = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
const NESTED_CATEGORY = "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

// Menu ke saare items (Recommended + baaki categories + nested) ek list me
const extractItems = (cards = []) => {
  const seen = new Set();
  const items = [];

  const add = (itemCards = []) => {
    itemCards.forEach((ic) => {
      const info = ic?.card?.info;
      if (info && !seen.has(info.id)) {
        seen.add(info.id);
        items.push(info);
      }
    });
  };

  cards.forEach((c) => {
    const card = c?.card?.card;
    if (card?.["@type"] === ITEM_CATEGORY) add(card.itemCards);
    if (card?.["@type"] === NESTED_CATEGORY) {
      card.categories?.forEach((cat) => add(cat.itemCards));
    }
  });
  return items;
};

const useRestaurantMenu = (resId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setData(null);
    setError(null);

    (async () => {
      try {
        const json = await fetchSwiggy(
          `${MENU_API}${resId}&catalog_qa=undefined&submitAction=ENTER`
        );
        if (ignore) return;

        const cards = json?.data?.cards;
        if (!cards) throw new Error("Swiggy ne menu data nahi diya");

        const info = cards.find((c) => c?.card?.card?.["@type"] === RESTAURANT_TYPE)
          ?.card?.card?.info;
        const regular = cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
          ?.REGULAR?.cards;

        setData({ info: info || {}, items: extractItems(regular) });
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [resId]); // resId badle to dobara fetch

  return { data, error };
};

export default useRestaurantMenu;
