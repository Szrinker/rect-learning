import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './error.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'project/:pid',
        element: <App />,
      }
    ]
  }
])

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
