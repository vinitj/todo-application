import { getAllTodos } from './components/common/utils';
import loadable from '@loadable/component';

const HomeComponent = loadable(() =>
    import(/* webpackChunkName: "App" */ './components/app'),
);

const HistoryComponent = loadable(() =>
    import(/* webpackChunkName: "History" */ './components/history'),
);

const allRoutes = [
    {
        path: '/home',
        label: 'Home',
        Component: HomeComponent,
        fetchData: getAllTodos,
    },
    {
        path: '/history',
        label: 'History',
        Component: HistoryComponent,
        fetchData: getAllTodos, // If we remove this component has to handle this accordingly
    },
];

export default allRoutes;
