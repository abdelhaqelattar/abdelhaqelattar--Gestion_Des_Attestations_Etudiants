import Sidebar from "./SideBar/Sidebar";
import Navigation from "./Navigation/Navigation";
import {useCallback, useContext, useEffect, useState} from "react";
import classes from "./Layout.module.css";
import {Outlet, useLocation} from "react-router-dom";
import {RouteContext} from "../Context/RoutesContext";

const Layout = () => {
    const [isOpen, setOpen] = useState(false);
    const [isHover, setHover] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 720);

    // Event listener for window resize
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 720);
        };

        // Set up the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showMenu = isOpen || (isHover && isLargeScreen);

    const toggleMenu = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);

    const location = useLocation();
    const {routes} = useContext(RouteContext);
    const pathname = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    const currentRoute = routes.find(route => route.path === pathname);

    return (
        <>
            <Navigation toggleMenu={toggleMenu} fullwidth={!showMenu} pageTitle={currentRoute ? currentRoute.pageTitle : ""}/>
            <Sidebar showMenu={showMenu} toggleMenu={toggleMenu} setHover={setHover}/>
            <main className={`${classes.main} ${!showMenu ? classes.fullwidth : ""}`}>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;