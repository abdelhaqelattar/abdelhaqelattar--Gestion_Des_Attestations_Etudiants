import { Dropdown, Image } from "react-bootstrap";
import { Key, LogOut, PlusCircle, Settings, User } from "react-feather";

import classes from "./Navigation.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const RightNav = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className={classes.right}>
      <Dropdown>
        <Dropdown.Toggle className={classes.toggle} variant="transparent">
          <Image
            className={classes.avatar}
            src="https://rise.fairsketch.com/files/profile_images/_file62ad94f892365-avatar.png"
            roundedCircle
          />
          <span className={classes.label}>ENSA Admin</span>
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className={classes.dropdownMenu}>
          <Dropdown.Item className={classes.dropdownItem} to="#/action-1">
            <User /> My Profile
          </Dropdown.Item>
          <Dropdown.Item className={classes.dropdownItem} to="#/action-1">
            <Key /> Change Password
          </Dropdown.Item>
          <Dropdown.Item className={classes.dropdownItem} to="#/action-1">
            <Settings /> My Preferences
          </Dropdown.Item>
          <Dropdown.Item className={classes.dropdownItem} onClick={logout}>
            <LogOut /> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default RightNav;
