import { RESTAURANT_IMAGE_CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resName, cuisine, rating, delivery, costForTwo, cloudinaryImageId }) => {
    return (
        <div className="rest-card">
            <img
                className="res-logo"
                alt="res-logo"
                src={RESTAURANT_IMAGE_CDN_URL + cloudinaryImageId}
            />
            <h2>{resName}</h2>
            <h4>{cuisine}</h4>
            <h4>{rating}</h4>
            <h4>{costForTwo / 100} for two</h4>
            <h4>{delivery} mins</h4>
        </div>
    )
}

// Higher order component , input - rest card output- rest card promoted

//Higher order function means which takes a function as an input and return another (rich/processed) function as an output.
//Higher order component means which takes a component as an input and returns a component (rich/processed/with more functionality) as an output.

export const withPromotedLabel = (RestaurantCard) => {
    return ({ resName, cuisine, rating, delivery, costForTwo, cloudinaryImageId }) => {
        return (
            <div className="promoted-card">
                <RestaurantCard
                    cloudinaryImageId={cloudinaryImageId}
                    resName={resName}
                    cuisine={cuisine}
                    rating={rating}
                    costForTwo={costForTwo}
                    delivery={delivery}
                />
            </div>
        )
    };
}

export default RestaurantCard;
