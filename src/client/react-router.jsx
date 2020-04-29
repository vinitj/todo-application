import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Application from './components/app';
import TimeBasedTask from './components/history';
import NotFound from './components/notfound';
import Layout from './components/layout';

const items = [
    {
        path: '/home',
        label: 'Home',
        Component: Application,
    },
    {
        path: '/history',
        label: 'History',
        Component: TimeBasedTask,
    },
];

const getRouters = (items) => {
    return items.map((item, index) => {
        const { path, Component } = item;
        return (
            <Route key={`route-${index}`} path={path}>
                {(props) => <Component path={props.match.path} />}
            </Route>
        );
    });
};

const ReactRouter = () => {
    return (
        <Layout items={items}>
            <Switch>
                {getRouters(items)}
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};
export default ReactRouter;
