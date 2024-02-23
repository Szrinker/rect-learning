import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './error.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createCanvas} from './MainCanvas.jsx';
import {threeStateContext} from './utils/threeStateContext.js';

const { injectCanvas, canvasState } = createCanvas();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App injectCanvas={injectCanvas} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'project/:pid',
        element: <App injectCanvas={injectCanvas} />,
      }
    ]
  }
]);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.createRoot(document.getElementById('root')).render(
  <threeStateContext.Provider value={canvasState}><RouterProvider router={router} /></threeStateContext.Provider>
);
