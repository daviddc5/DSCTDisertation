//index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
//Imports BrowserRouter to set the App router
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
// Import bootstrap into the whole web App
import "bootstrap/dist/css/bootstrap.min.css";
//Import firebase context
import FirebaseContext from './FirebaseContext';


const root = document.getElementById('root');

//Passing firebase to all components
createRoot(root).render(
  <React.StrictMode>
    <FirebaseContext.Provider value ={null}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
);


