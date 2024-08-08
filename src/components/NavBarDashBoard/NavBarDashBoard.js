import { useState } from "react";
import "./NavBarDashBoard.css";
import { Link } from "react-router-dom";
import NavListItem from "../NavListItem/NavListItem";
import { NavDashBoards } from "../../data/navDashBoard";

export default function NavBarDashBoard({active}) {
    const [navData, setNavData] = useState(NavDashBoards);
    return (
        <div className={`sideMenu ${active ? 'active' : undefined}`}>
            <Link to="/" className="logo">
                <img src="https://firebasestorage.googleapis.com/v0/b/bcu-study-space-cded8.appspot.com/o/avatar%2FOIP.jpeg?alt=media&token=d3fff1dc-9775-464c-a94e-95b4a8606ef0" className="w-20 h-20"/>
                <span className={`bg-gradient-to-r from-[#432371] to-[#faae7b] inline-block text-transparent bg-clip-text font-lobster font-normal ${active ? 'hidden' : 'text-7xl'}`}>BCU</span>
            </Link>
            <ul className="nav">
                {navData.map((section, index) => (
                    <NavListItem key={index} section={section}/>
                ))}
            </ul>
        </div>
    )
}