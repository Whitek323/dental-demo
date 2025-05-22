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
const router = createBrowserRouter([
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
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
