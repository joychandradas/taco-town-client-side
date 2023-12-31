import React from 'react';
import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login/Login';
import Register from '../pages/Login/Register/Register';
import ChefDetails from '../pages/Home/ChefDetails/ChefDetails';
import PrivetRoute from './PrivetRoute';
import ErrorPage from '../pages/Shared/ErrorPage/ErrorPage';
import Blog from '../pages/Blog/Blog';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/chef-details/:id',
        element: <PrivetRoute>
          <ChefDetails />
        </PrivetRoute>,
        loader: ({ params }) => fetch(`https://chef-hat-server-side-whitehut3q-gmailcom.vercel.app/chef-details/${params.id}`)
      }
    ]
  }
]);


export default router;