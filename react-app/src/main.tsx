import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // ← додано
import './index.css';
import App from './App.tsx';
import { store } from './app/store'; // ← додано

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* ← обгортка Redux */}
      <App />
    </Provider>
  </StrictMode>
);
