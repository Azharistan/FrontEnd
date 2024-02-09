import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import mylogo from './HomeSubComponents/logo.png';
import "./sidebar.css";

const Nav = styled.div``;

const NavIcon = styled(Link)`
`;

const SidebarNav = styled.nav`
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;

const SidebarWrap = styled.div`
`;

const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);

return (
	<>
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav className="Nav">
			<NavIcon className="NavIcon" to="#">
				<FaIcons.FaBars onClick={showSidebar} />
			</NavIcon>
				<a href="/">
					<img className="logo" src={mylogo} />
				</a>
				<div className="options">
				<ul>
					<li><button className="SignInLogin" onClick={()=>{
						location.href= "/signup"
					}}>Sign Up</button></li>
					<li><button className="SignInLogin" onClick={()=>{
						location.href= "/login"
					}}>Log In</button></li>
				</ul>
			</div>
		</Nav>
		<SidebarNav className="SidebarNav" sidebar={sidebar}>
		<SidebarWrap className="SidebarWrap">
			<NavIcon className="NavIcon" to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
			return <SubMenu item={item} key={index} />;
			})}
		</SidebarWrap>
		</SidebarNav>
    
	</IconContext.Provider>
	</>
);
};

export default Sidebar;