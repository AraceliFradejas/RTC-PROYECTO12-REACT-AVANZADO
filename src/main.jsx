import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
const root = document.getElementById('root');
const application = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
const route = window.location.pathname.replace(/\/$/, '') || '/';
if (root.hasChildNodes() && root.dataset.route === route) hydrateRoot(root, application);
else createRoot(root).render(application);
