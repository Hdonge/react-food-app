import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../hooks/useOnlineStatus";

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


const Body = () => {
    const [listOFRestaurant, setListOfRestaurant] = useState([]);
    const [searchText, setSearchText] = useState('');
    const onlineStatus = useOnlineStatus();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(SWIGGY_API_URL, {
            headers: { accept: 'application/json' },
        });
        const json = await data.json();
        setListOfRestaurant(json.data.cards[2]?.card.card.gridElements.infoWithStyle.restaurants);
    }

    const filterTopRatedRestaurants = () => {
        setListOfRestaurant(listOFRestaurant.filter((res) => res.info.avgRating > 4));
    }

    const filterBasedOnSearchText = () => {
        console.log(listOFRestaurant.filter((res) => res.info.name.toLowerCase().includes(searchText) === true));
        setListOfRestaurant(listOFRestaurant.filter((res) => res.info.name.toLowerCase().includes(searchText)));
    }

    if (onlineStatus === false) return <h1>Looks like you are offline, Please check your internet connection</h1>;

    if (listOFRestaurant.length === 0) return <Shimmer />;

    return (
        <>
            <div className="search-filter">
                <input type="text" className="search-input" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={filterBasedOnSearchText}>Search</button>
            </div>
            <button onClick={filterTopRatedRestaurants}>Top rated restaurants</button>
            <div className="res-container">
                {listOFRestaurant.map((restaurant, index) =>
                    <Link
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}>
                        {index === 0 ?
                            <RestaurantCardPromoted
                                cloudinaryImageId={restaurant.info.cloudinaryImageId}
                                resName={restaurant.info.name}
                                cuisine={restaurant.info.cuisines.join(", ")}
                                rating={restaurant.info.avgRating}
                                costForTwo={restaurant.info.costForTwo}
                                delivery={restaurant.info.deliveryTime}
                            />
                            :
                            <RestaurantCard
                                cloudinaryImageId={restaurant.info.cloudinaryImageId}
                                resName={restaurant.info.name}
                                cuisine={restaurant.info.cuisines.join(", ")}
                                rating={restaurant.info.avgRating}
                                costForTwo={restaurant.info.costForTwo}
                                delivery={restaurant.info.deliveryTime}
                            />}
                    </Link>
                )}
            </div>
        </>

    )
}

export default Body;
