import React, { useState, useEffect } from 'react';
import { getAllTodos } from './components/common/utils';
import loadable from '@loadable/component';

export const View = (props) => {
    const { ssrData, fetchData, Component, path, ssrPath } = props;

    const modifiedSSR = ssrPath === path ? ssrData : null;

    const [data, setData] = useState(modifiedSSR);

    useEffect(() => {
        if (modifiedSSR === null && fetchData) {
            fetchData().then((data) => {
                setData(data);
            });
        }
    }, []);
    return <Component ssrData={data} path={path} />;
};

const allRoutes = [
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
        fetchData: getAllTodos,
    },
];

export default allRoutes;
