import { matchPath } from 'react-router-dom';
import allAppRoutes from '../../client/base/server-routes';

export const getAppEntryPointBasedOnURL = (url) => {
    for (const key of Object.keys(allAppRoutes)) {
        const allRoutes = allAppRoutes[key];
        for (let route = 0; route < allRoutes.length; route++) {
            if (allRoutes[route].path === url) {
                return key;
            }
        }
    }
    return 'generic';
};

export const getDataPromises = (path) => {
    const allDataPromises = [];
    let i = 0;
    let match = null;
    const allRoutes = [];

    for (const key of Object.keys(allAppRoutes)) {
        allRoutes.push(...allAppRoutes[key]);
    }

    for (i = 0; i < allRoutes.length; i++) {
        match = matchPath(path, allRoutes[i]);
        if (match) {
            if (allRoutes[i].fetchData) {
                if (Array.isArray(allRoutes[i].fetchData)) {
                    allDataPromises.push(
                        ...allRoutes[i].fetchData.map((dataCalls) =>
                            dataCalls(),
                        ),
                    );
                } else {
                    allDataPromises.push(allRoutes[i].fetchData());
                }
            }
            break;
        }
    }
    return { promises: allDataPromises, route: i, match };
};
