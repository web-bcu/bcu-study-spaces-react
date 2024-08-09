import { useState } from "react";
import NavBarDashBoard from "../NavBarDashBoard/NavBarDashBoard";
import "./LayoutDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../redux/slices/active";
import Header from "../Header/Header";

export default function LayoutDashBoard({children}) {
    // const [active, setActive] = useState(false);
    const active = useSelector((state) => state.active);
    const dispatch = useDispatch();

    const handleToggleActive = () => {
        dispatch(setActive());
    }

    return (
        <main className="layoutDashBoard">
            <NavBarDashBoard active={active} />
            <div 
            className={`banner ${active ? 'active' : undefined}`}
            >
                <Header
                    toggleActive={handleToggleActive} 
                />
                <div className="h-screen overflow-y-auto">
                    {children}
                    <p className="mb-60"></p>
                </div>
            </div>
        </main>
    )
}