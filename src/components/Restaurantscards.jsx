import { RES_CARD_LOGO } from "../utils/constants";
import{Link} from "react-router-dom";
const ResataurantsCards = ({ resData }) => {
    const { name, cloudinaryImageId, cuisines, avgRating, costForTwo, sla } = resData;
    return (
        <div className="ResataurantsCards">
            <img
                className="res-card-logo"
                src={RES_CARD_LOGO+cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} Star</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla.slaString}</h4>
        </div>
    );
};
export default ResataurantsCards;