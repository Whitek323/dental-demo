import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import brushTeethIcon from "../assets/icon/toothbrush.png";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import './Menubar.css';

export default function Menubar() {
    return (
        <>
            <nav className="navbar fixed-bottom text-white custom-nav" style={{backgroundColor:"#9000ff"}}>
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
                          {/* <img className="brush-icon" style={{filter: "invert(1)"}} src={brushTeethIcon} alt="Brush Teeth" width={25} height={25}/> */}
                          <SportsEsportsIcon/>
                        </div>
                        Play Game</a>
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
