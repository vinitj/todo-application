import React from 'react';
import { getAllTodos } from './components/common/utils';
import loadable from '@loadable/component';

const HomeComponent = loadable(
    () => import(/* webpackChunkName: "oldHome" */ './components/app'),
    { ssr: false, fallback: <div>OOps Not SSRed </div> },
);

const OldHistoryComponent = loadable(() =>
    import(/* webpackChunkName: "oldHistory" */ './components/old-history'),
);
const allRoutes = [
    {
        path: '/old-home',
        label: 'Home',
        Component: HomeComponent,
        fetchData: getAllTodos,
    },
    {
        path: '/old-history',
        label: 'History',
        Component: OldHistoryComponent,
        fetchData: getAllTodos,
    },
];

export default allRoutes;
