import { useNavigate } from "react-router-dom";
import './topbar.css'
import { NotificationsNone, Language, Settings, Logout } from '@mui/icons-material';

const Topbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); 
        navigate("/login"); 
    };
    return (

        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topleft">
                    <span className="logo">POKEMON</span>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <button className="logoutbutton" onClick={handleLogout}>
                            <Logout />
                        </button>
                    </div>
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainersetting" onClick={()=> navigate("/Settings")}>
                        <Settings />
                    </div>
                    <div onClick={()=> navigate("/Profile")}>
                    <img src="https://www.shutterstock.com/image-photo/cute-pokemon-260nw-2420965349.jpg" alt="" className="topavatar" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Topbar
