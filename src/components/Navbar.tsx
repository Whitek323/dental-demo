import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import brushTeethIcon from "../assets/icon/toothbrush.png";

import './Navbar.css';

export default function Navbar() {
    return (
        <>
            <nav className="navbar fixed-bottom text-white bg-info-subtle custom-nav" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="nav-item">
                        <div className="icon-container">
                            <DashboardIcon />
                        </div>
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </span>

                    <span className="nav-item">
                        <div className="icon-container">
                             <img className="brush-icon" src={brushTeethIcon} alt="Brush Teeth" width={25} height={25}/>
                        </div>
                        <a className="nav-link" href="/tooth">Brush teeth</a>
                    </span>

                    <span className="nav-item">
                        <div className="icon-container">
                            <SettingsIcon />
                        </div>
                        <a className="nav-link" href="/settings">Setting</a>
                    </span>
                </div>
            </nav>
        </>
    );
}
