import React from 'react';
import ReactDOMServer from 'react-dom/server';
import render from './render';
import { StaticRouter, matchPath } from 'react-router-dom';
import ReactRouterApp, { allRoutes } from '../client/react-router';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import runtime from './runtime/fetch';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';

const nodeStats = path.resolve(__dirname, '../../build/node/loadable-stats.json');

const webStats = path.resolve(__dirname, '../../build/web/loadable-stats.json');

const getDataPromises = (path) => {
    const allDataPromises = [];
    let i = 0;
    for (i = 0; i < allRoutes.length; i++) {
        const match = matchPath(path, allRoutes[i]);
        if (match) {
            if (allRoutes[i].fetchData) {
                if (Array.isArray(allRoutes[i].fetchData)) {
                    allDataPromises.push(...allRoutes[i].fetchData.map((dataCalls) => dataCalls()));
                } else {
                    allDataPromises.push(allRoutes[i].fetchData());
                }
            }
            break;
        }
    }
    return { promises: allDataPromises, route: i };
};

const renderRouteMarkup = (req, res, initialState = undefined, route) => {
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['main'] });
    const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['main'] });

    const { default: ReactRouterMainApp } = nodeExtractor.requireEntrypoint('main');

    const sheets = new ServerStyleSheets();

    const context = {};
    let ssrData = null;

    if (initialState) {
        ssrData = Array.isArray(route.fetchData) ? initialState : initialState[0];
    }

    const html = webExtractor.collectChunks(
        <StaticRouter location={req.url} context={context}>
            <ReactRouterMainApp ssrData={ssrData} />
        </StaticRouter>,
    );

    const scriptTags = webExtractor.getScriptTags();

    const finalJsx = ReactDOMServer.renderToString(sheets.collect(html));

    const css = sheets.toString();

    res.set('content-type', 'text/html');
    res.send(render(finalJsx, scriptTags, css, ssrData));
};

export const indexRoute = function (req, res) {
    const { promises, route } = getDataPromises(req.path);

    if (promises.length > 0) {
        Promise.all(promises).then((initialState) => {
            renderRouteMarkup(req, res, initialState, route);
        });
    } else {
        renderRouteMarkup(req, res, null, route);
    }
};
