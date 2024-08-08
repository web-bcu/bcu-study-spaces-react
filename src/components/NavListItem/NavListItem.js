import { Link, useLocation } from "react-router-dom";
import "./NavListItem.css";

export default function NavListItem({ section }) {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <li>
            <Link to={section.link} className={`${pathname.includes(section.link) ? "active" : undefined}`}>
                <span className="w-10 h-10 text-2xl flex justify-center items-center">{section.icon}</span>
                {/* {section.icon} */}
                <span className="navName">{section.name}</span>
            </Link>
        </li>
    )
}

// className={`${pathname.includes(section.link) ? "bg-gradient-to-r from-[#432371] to-[#faae7b] text-white" : "text-white"} text-2xl text-center hover:bg-gradient-to-r from-[#432371] to-[#faae7b] flex gap-5 justify-start items-center h-16 rounded-md`}