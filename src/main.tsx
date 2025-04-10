import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
console.log('Rendering app...');

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
