import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './appComponents/Home';
import InvoiceCopyEditor from './appComponents/features/invoicesBuilder/InvoiceCopyEditor';
import InvoiceEditor from './appComponents/features/invoicesBuilder/InvoiceEditor';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './appStore/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-invoice",
    element: <App />,
  },
  {
    path: "/edit/:id",
    element: <InvoiceEditor />,
  },
  {
    path: "/create-with-copy/:id",
    element: <InvoiceCopyEditor />,
  },
]);


ReactDOM.render(
  <React.StrictMode>
        <Provider store={store}>

     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
