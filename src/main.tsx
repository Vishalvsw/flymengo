import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TravelProvider } from './context/TravelContext.tsx';
<<<<<<< HEAD
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker with auto-update
registerSW({ immediate: true });
=======
>>>>>>> 91b3bb62992838a851e7cc51dccb3177ca7ce392

createRoot(document.getElementById('root')!).render(
  <TravelProvider>
    <App />
  </TravelProvider>
);
<<<<<<< HEAD

=======
>>>>>>> 91b3bb62992838a851e7cc51dccb3177ca7ce392
