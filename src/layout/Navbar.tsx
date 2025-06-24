import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import brushTeethIcon from "../assets/icon/toothbrush.png";

export default function Navbar() {
    return (
        <>
            <nav className="navbar fixed-top text-white my-0 py-2" style={{backgroundColor:"#2f064f"}}>
                <div className="container-fluid d-flex justify-content-between mx-0 px-1">
                    
                   <div className="d-flex">

                        <div className='rounded-4 px-1 d-flex align-items-center me-1' style={{backgroundColor:"#243e67"}}>
                            <img src="game/energy.png" alt="" width={"40em"} />
                            <p className="fw-bold d-inline align-items-center mb-0" style={{color:"#2a9e1b"}}>3</p>
                        </div>
                        <div className='rounded-4 px-1 d-flex align-items-center' style={{backgroundColor:"#283f82"}}>
                            <img src="game/coin.png" alt="" width={"40em"} />
                            <p className="fw-bold d-inline align-items-center mb-0" style={{color:"#8f76ff"}}>500</p>
                        </div>
                   </div>
                    <div className="d-flex">
                        <div className='rounded-4 px-2 d-flex align-items-center' style={{backgroundColor:"#d73333"}}>
                            <img src="game/remove-ads.png" alt="" width={"40em"} />
                            <p className="fw-bold d-inline align-items-center mb-0" style={{color:"#e1da05"}}>REMOVE ADS</p>
                        </div>
            
                    </div>
                    
                </div>
            </nav>
        </>
    );
}
