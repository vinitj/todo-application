import React from 'react';
import { Route } from 'react-router-dom';

const NotFound = () => {
    return (
        <Route
            render={({ staticContext }) => {
                if (staticContext) staticContext.status = 404;
                return <div>OOPs !! You landed on mars :P</div>;
            }}
        />
    );
};

export default NotFound;
