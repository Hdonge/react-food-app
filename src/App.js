import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Body from "./components/Body";
import "../index.css";
// import About from "./components/About";
// import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import appStore from "./store/appStore";
// import Cart from "./components/Cart";
// import RestaurantMenu from "./components/RestaurantMenu";

const About = lazy(() => import('./components/About'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Cart = lazy(() => import('./components/Cart'));
const RestaurantMenu = lazy(() => import('./components/RestaurantMenu'));
const Error = lazy(() => import('./components/Error'));

/***
 * Header
 *  - Logo
 *  - Nav Items
 * Body
 *  - Search
 *  - RestaurantContainer
 *     - RestaurantCard
 *          - Img
 *          - Name of Res, Star rating, cuisine, Delievry time.
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 * 
 */

const Applayout = () => {
    return (
        <Provider store={appStore}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        errorElement: <Suspense fallback={<h1>Loading...</h1>}><Error /></Suspense>,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>
            },
            {
                path: "/contactus",
                element: <Suspense fallback={<h1>Loading...</h1>}><ContactUs /></Suspense>
            },
            {
                path: "/cart",
                element: <Suspense fallback={<h1>Loading...</h1>}><Cart /></Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <Suspense fallback={<h1>Loading...</h1>}><RestaurantMenu /></Suspense>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
