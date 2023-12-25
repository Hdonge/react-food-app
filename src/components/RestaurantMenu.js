import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Shimmer from './Shimmer';
import useRestaurantMenu from '../hooks/useRestaurantDetails';

const RestaurantMenu = () => {
    const { resId } = useParams();
    const { restInfo, menuInfo } = useRestaurantMenu(resId);


    return (restInfo === null) ? <Shimmer /> : (
        <div className='menu'>
            <h1>{restInfo.name}</h1>
            <h4>{restInfo.cuisines.join(", ")} - {restInfo.costForTwoMessage}</h4>
            <ul>
                {menuInfo?.map((card) =>
                    <li key={card.card.info.id}>
                        <div>{card.card.info.name} - ₹ {card.card.info.price / 100}</div>
                        <div>{card.card.info.description}</div>
                    </li>

                )}
            </ul>
        </div >
    )
}

export default RestaurantMenu;
