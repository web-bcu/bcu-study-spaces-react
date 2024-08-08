import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";
import { useDispatch } from "react-redux";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function Header({toggleActive}) {
    const {user} = useAuth();
    const location = useLocation();
    const dispatch = useDispatch();

    const userProfile = () => {
        window.location = `/profile/${user?._id}`;
    }

    return (
        <header>
            <a  className="menu" onClick={toggleActive}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                </svg>
            </a>
            <div className="userItems">
                {/* <a href="#" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                    <span className='like bg-gradient-to-r from-[#432371] to-[#faae7b]'>0</span>
                </a>
                <a href="#" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                    </svg>
                    <FontAwesomeIcon icon={faFloppyDisk}/>
                    <span className='bag bg-gradient-to-r from-[#432371] to-[#faae7b]'>0</span>
                </a> */}
                <div className='avatar justify-center items-center' onClick={userProfile}>
                    <a href='#'>
                        <img 
                        src={user?.avatar} 
                        alt='User Image'/>
                    </a>
                    <div className="user">
                        <h1 className="bg-gradient-to-r from-[#432371] to-[#faae7b] inline-block text-transparent bg-clip-text text-xl">{user?.name}</h1>
                        <a href="#">View Profile</a>
                    </div>
                </div>
            </div>
        </header>
    )
}