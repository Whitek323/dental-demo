import SettingsPage from '../pages/SettingsPage.tsx';
import ToothPage from '../pages/ToothPage.tsx';
import DashboardPage from '../pages/menu/DashboardPage.tsx';
import BacteriaDefender from '../game/bacteria/BacteriaDefender.tsx';
import DisplayMain from '../pages/DisplayMain.tsx';
import GameBrushTooth from '../components/GameBrushTooth.tsx';
import HomePage from '../pages/HomePage.tsx';
import MenuPage from '../pages/menu/MenuPage.tsx';
import {
  createBrowserRouter,
} from "react-router";
const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/menu',
    element:<MenuPage/>
  },
  {
    path:'/tooth',
    element:<ToothPage/>
  },
  {
    path:'/dashboard',
    element:<DashboardPage/>
  },
  {
    path:'/settings',
    element:<SettingsPage/>
  },
  {
    path:'/bacteriadefender',
    element:<BacteriaDefender/>
  },
  {
    path:'/hand',
    element:<DisplayMain/> 
  },
  {
    path:'/gameBrushTooth',
    element:<GameBrushTooth/>
  },
])

export default router