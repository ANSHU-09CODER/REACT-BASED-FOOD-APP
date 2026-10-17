export const LOGO_URL =
  "https://images-platform.99static.com//EuX-TCH0phhxsRuT5WS3n_ylNGg=/0x0:1477x1477/fit-in/500x500/99designs-contests-attachments/135/135710/attachment_135710011";

export const RES_CARD_LOGO =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const LAT = "29.22480";
const LNG = "79.53130";

export const RESTAURANT_LIST_API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

// resId ko end me jod kar use karte hain (hooks/useRestaurantMenu.js me)
export const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=`;
