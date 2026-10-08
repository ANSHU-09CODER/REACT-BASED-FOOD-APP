import { LOGO_URL } from "../utils/constants";
import{Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="logoContainer">
                <img className="logo"
                    src={LOGO_URL}>
                </img>
            </div>
            <div className="navItems">
                <ul>
                    <li><Link to={"/contact"}>Home</Link></li>
                    <li><Link to={"/About"}>About Us</Link></li>
                    <li><Link>Contact Us</Link></li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>)
}
export default Header;