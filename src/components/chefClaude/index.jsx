import { createRoot } from 'react-dom/client';
import App from './App';
// To use environment variables in Create React App, use REACT_APP_ prefix
console.log(import.meta.env.VITE_ANTHROPIC_API_KEY);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
