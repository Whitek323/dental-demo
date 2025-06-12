import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import brushTeethIcon from "../assets/icon/toothbrush.png";

import './Navbar.css';

export default function Navbar() {
    return (
        <>
            <nav className="d-none navbar fixed-bottom text-white bg-info-subtle custom-nav" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="nav-item">
                        <a className="nav-link" href="/dashboard">
                        <div className="icon-container text-center">
                            <DashboardIcon />
                        </div>
                        Dashboard</a>
                    </span>

                    <span className="nav-item">
                        <a className="nav-link" href="/tooth">
                        <div className="icon-container text-center">
                             <img className="brush-icon" style={{filter: "invert(1)"}} src={brushTeethIcon} alt="Brush Teeth" width={25} height={25}/>
                        </div>
                        Brush teeth</a>
                    </span>

                    <span className="nav-item">
                        <a className="nav-link" href="/settings">
                        <div className="icon-container text-center">
                            <SettingsIcon />
                        </div>
                        Setting</a>
                    </span>
                </div>
            </nav>
        </>
    );
}
