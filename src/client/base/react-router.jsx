import React from 'react';
import { Switch, Route } from 'react-router-dom';
import getGenericRoutes from '../generic';

import View from './view';

const getRouters = (items, ssrData, ssrPath) => {
    return items.map((item, index) => {
        const { path, fetchData } = item;
        return (
            <Route key={`route-${index}`} path={path}>
                {(props) => (
                    <View
                        path={props.match.path}
                        fetchData={fetchData}
                        ssrPath={ssrPath}
                        ssrData={ssrData}
                        {...item}
                    />
                )}
            </Route>
        );
    });
};

const ReactRouter = (props) => {
    const { ssrData, ssrPath, allRoutes } = props;
    return (
        <Switch>
            {getRouters(allRoutes, ssrData, ssrPath)}
            {getGenericRoutes()}
        </Switch>
    );
};
export default ReactRouter;
