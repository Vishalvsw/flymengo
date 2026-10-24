import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TravelProvider } from './context/TravelContext.tsx';

createRoot(document.getElementById('root')!).render(
  <TravelProvider>
    <App />
  </TravelProvider>
);
