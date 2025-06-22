import SettingsPage from '../pages/SettingsPage.tsx';
import ToothPage from '../pages/ToothPage.tsx';
import DashboardPage from '../pages/menu/DashboardPage.tsx';
import App from '../game/Game.tsx';
import DisplayMain from '../pages/DisplayMain.tsx';
import GameBrushTooth from '../components/GameBrushTooth.tsx';
import OldApp from '../game/OldApp.tsx';
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
    path:'/game',
    element:<App/>
  },
  {
    path:'/hand',
    element:<DisplayMain/> 
  },
  {
    path:'/gameBrushTooth',
    element:<GameBrushTooth/>
  },
  {
    path:'/gameOld',
    element:<OldApp/>
  }
])

export default router