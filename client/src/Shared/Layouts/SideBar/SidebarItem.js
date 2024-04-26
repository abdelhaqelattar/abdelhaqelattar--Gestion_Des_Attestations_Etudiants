import {Link, useLocation} from 'react-router-dom';

import classes from "./SidebarItem.module.css";
import {Minus} from "react-feather";
import React, {useCallback, useState} from "react";
import {CSSTransition} from "react-transition-group";

const LinkOrButton = (props) => {
    if (props.to) {
        return <Link to={props.to} {...props}>{props.children}</Link>;
    } else {
        return <div {...props}>{props.children}</div>;
    }
}

const SidebarItem = ({icon, name, link, subitems, menuOpen}) => {
    // Get the current location using useLocation hook
    const location = useLocation();
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);

    const isActive = () => {
        const pathname = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
        const isActive = pathname === link;
        return isActive ? classes.active : '';
    }

    return (
        <li className={`${classes.sidebarItem} ${isActive()} ${(subitems && menuOpen) ? classes.hasSubMenu : ""} ${isOpen ? classes.open : ""}`}>
            <LinkOrButton to={link} className={classes.sidebarItemLink} onClick={toggleMenu}>
                {icon}
                <CSSTransition
                    in={menuOpen}
                    timeout={200}
                    classNames={{
                        enter: classes.textEnter,
                        exit: classes.textExit,
                    }}
                    unmountOnExit
                >
                    <span className={classes.menuText}>{name}</span>
                </CSSTransition>
            </ LinkOrButton>
            {subitems && (
                <CSSTransition
                    in={isOpen && menuOpen}
                    timeout={500}
                    classNames={{
                        enter: classes.submenuEnter,
                        enterActive: classes.submenuEnterActive,
                        exit: classes.submenuExit,
                        exitActive: classes.submenuExitActive,
                    }}
                    unmountOnExit
                >
                    <ul className={classes.submenu}>
                        {subitems &&
                            subitems.map((item, index) => (
                                <SidebarItem
                                    key={index}
                                    name={item.name}
                                    icon={<Minus/>}
                                    link={item.link}
                                    subitems={item.subitems}
                                    menuOpen={menuOpen}
                                />
                            ))}
                    </ul>
                </CSSTransition>
            )}
        </li>
    );

}

export default React.memo(SidebarItem);