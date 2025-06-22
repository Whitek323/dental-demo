import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ThemeApp from './ThemeApp';
import Layout from './layout/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeApp>
      <Layout/>
    </ThemeApp>
  </StrictMode>,
)
