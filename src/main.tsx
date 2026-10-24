import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TravelProvider } from './context/TravelContext.tsx';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker with auto-update
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <TravelProvider>
    <App />
  </TravelProvider>
);

