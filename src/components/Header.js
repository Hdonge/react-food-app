import { useContext } from "react";
import { Link } from "react-router-dom";

import { LOGO_IMG_URL } from "../utils/constants";
import useOnlineStatus from "../hooks/useOnlineStatus";
import userContext from "../UserContext";
import { useSelector } from "react-redux";

export const Header = () => {
    const onlineStatus = useOnlineStatus();
    const data = useContext(userContext);
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems, "cartItems");
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img
                        src={LOGO_IMG_URL}
                        className="logo"
                    />
                </Link>

            </div>
            <div className="nav-items">
                <ul>
                    <li> Online Status: {onlineStatus ? '🟢' : '🔴'}</li>
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="about">About Us</Link></li>
                    <li><Link to="/contactus">Contact Us</Link></li>
                    <li><Link to="/cart">Cart {cartItems.length}</Link></li>
                    <li>{data.loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
