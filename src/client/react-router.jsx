import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout';
import { getAllTodos } from './components/common/utils';
import loadable from '@loadable/component';

export const allRoutes = [
    {
        path: '/home',
        label: 'Home',
        Component: loadable(() => import('./components/app')),
        fetchData: getAllTodos,
    },
    {
        path: '/history',
        label: 'History',
        Component: loadable(() => import('./components/history')),
    },
];

const getRouters = (items, ssrData) => {
    return items.map((item, index) => {
        const { path, Component, fetchData } = item;
        return (
            <Route key={`route-${index}`} path={path}>
                {(props) => <Component path={props.match.path} ssrData={fetchData ? ssrData : null} />}
            </Route>
        );
    });
};

const ReactRouter = (props) => {
    const { ssrData } = props;
    const NotFound = loadable(() => import('./components/notfound'));
    return (
        <Layout items={allRoutes}>
            <Switch>
                {getRouters(allRoutes, ssrData)}
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};
export default ReactRouter;
