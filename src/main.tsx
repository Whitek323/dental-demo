import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import SettingsPage from './pages/SettingsPage.tsx';
import Navbar from './components/Navbar.tsx';
import ToothPage from './pages/ToothPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './game/App.tsx';
import DisplayMain from './pages/DisplayMain.tsx';
import GameBrushTooth from './components/GameBrushTooth.tsx';
import OldApp from './game/OldApp.tsx';
const router = createBrowserRouter([
  {
    path:'/',
    element:<DashboardPage/>
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
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
