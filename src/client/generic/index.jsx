import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from './not-found';

const getGenericRoutes = () => {
    return (
        <>
            <Route
                render={({ staticContext }) => {
                    if (staticContext) staticContext.status = 404;
                    return <NotFound />;
                }}
            />
        </>
    );
};
export default getGenericRoutes;
