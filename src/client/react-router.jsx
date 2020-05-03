import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Layout from './components/layout';
import allRoutes from './routes';
import { View } from './routes';

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

const NotFound = loadable(() => import('./components/notfound'));

const ReactRouter = (props) => {
    const { ssrData, ssrPath } = props;
    return (
        <Layout items={allRoutes}>
            <Switch>
                {getRouters(allRoutes, ssrData, ssrPath)}
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};
export default ReactRouter;
