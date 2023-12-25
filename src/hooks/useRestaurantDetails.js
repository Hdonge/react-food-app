import { useEffect, useState } from "react";

import { SWIGGY_MENU_API_URL } from '../utils/constants';

const useRestaurantMenu = (resId) => {
    const [restInfo, setRestInfo] = useState(null);
    const [menuInfo, setMenuInfo] = useState([]);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(SWIGGY_MENU_API_URL + resId);
        const json = await data.json();
        setRestInfo(json.data.cards[0]?.card?.card?.info);
        setMenuInfo(json.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card.itemCards);
    }

    return { restInfo, menuInfo };
};

export default useRestaurantMenu;
