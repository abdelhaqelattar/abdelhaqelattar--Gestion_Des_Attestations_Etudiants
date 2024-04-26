import classes from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import {
  Menu,
  Monitor,
  Users,
  User,
  ShoppingCart,
  Clock,
  MessageSquare,
  Book,
  Search,
  Home
} from "react-feather";
import { Image } from "react-bootstrap";
import { useContext } from "react";
import { RouteContext } from "../../Context/RoutesContext";
// import slogo from sidebar;
import slogo from "./slogo.png";
import sslogo from "./sslogo.png";
const Sidebar = ({ showMenu, toggleMenu, setHover }) => {
  const { docTypes } = useContext(RouteContext);

  const docTypeMenu = docTypes.map((ele) => {
    return {
      name: ele.title,
      link: "/dashboard/" + ele.link,
      outside: ele.outside,
    };
  });

  const docTypeMenuOutside = docTypes
    .filter((ele) => ele.outside)
    .map((ele) => {
      return {
        name: ele.title,
        link: "/dashboard/" + ele.link,
        icon: <MessageSquare />,
        outside: ele.outside,
      };
    });
  const docTypeMenuInside = docTypes
    .filter((ele) => !ele.outside)
    .map((ele) => {
      return {
        name: ele.title,
        link: "/dashboard/" + ele.link,
        icon: <Users />,
        outside: ele.outside,
      };
    });

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home />,
      link: "/dashboard",
    },
    {
      name: "Attestations",
      icon: <Book />,
      subitems: docTypeMenuInside,
    },
    ...docTypeMenuOutside,
    {
      name: "Historique",
      icon: <Clock />,
      link: "/dashboard/historique",
    },
  ];

  return (
    <div
      className={`${classes.sidebar} ${showMenu ? classes.open : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={classes.sidebarHeader}>
        <div>
          {showMenu && <Image src={slogo} />}
          {!showMenu && <Image src={sslogo} />}
        </div>
        {showMenu && (
          <div className={classes.buttonContainer}>
            <Menu onClick={toggleMenu} />
          </div>
        )}
      </div>
      <ul className={classes.sidebarMenu}>
        {menuItems.map((item, index) => (
          <SidebarItem
            className="main"
            name={item.name}
            icon={item.icon}
            link={item.link}
            subitems={item.subitems}
            menuOpen={showMenu}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
