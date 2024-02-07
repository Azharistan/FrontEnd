// SubMenu.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./submenu.css"; // Import the CSS file

const SidebarLink = styled(Link)`
  /* No need to duplicate the styling here */
`;

const SidebarLabel = styled.span`
  /* No need to duplicate the styling here */
`;

const DropdownLink = styled(Link)`
  /* No need to duplicate the styling here */
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        className="SubMenuLink"
        onClick={item.subNav && showSubnav}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              key={index}
              className="SubMenuDropdownLink"
            >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
