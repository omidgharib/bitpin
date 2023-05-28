import React from 'react';
import { lazy } from 'react';
const Markets = lazy(() => import('../Views/Market'));
import ErrorPage from '../Views/ErrorPage';

const mainRoutes = [
    {
        path: "/",
        element: <Markets />,
        errorElement: <ErrorPage />,
    }
];

export default mainRoutes;
