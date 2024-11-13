import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './error';
import './index.scss';
import i18n from 'i18n';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createCanvas} from './MainCanvas';
import {threeStateContext} from 'utils/threeStateContext';

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
