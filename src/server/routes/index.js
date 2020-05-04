import React from 'react';
import ReactDOMServer from 'react-dom/server';
import render from './render';
import { StaticRouter } from 'react-router-dom';
import { getAppEntryPointBasedOnURL, getDataPromises } from './utils';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';

const nodeStats = path.resolve(
    __dirname,
    '../../../build/node/loadable-stats.json',
);

const webStats = path.resolve(
    __dirname,
    '../../../build/web/loadable-stats.json',
);

const renderRouteMarkup = (
    req,
    res,
    initialState = undefined,
    route,
    match,
) => {
    const entryPoint = getAppEntryPointBasedOnURL(match ? match.path : null);
    const nodeExtractor = new ChunkExtractor({
        statsFile: nodeStats,
        entrypoints: [entryPoint],
    });
    const webExtractor = new ChunkExtractor({
        statsFile: webStats,
        entrypoints: [entryPoint],
    });

    const { default: ReactRouterMainApp } = nodeExtractor.requireEntrypoint(
        entryPoint,
    );

    const sheets = new ServerStyleSheets();

    const context = {};
    let ssrData = null;

    if (initialState) {
        ssrData = Array.isArray(route.fetchData)
            ? initialState
            : initialState[0];
    }

    const html = webExtractor.collectChunks(
        <StaticRouter location={req.url} context={context}>
            <ReactRouterMainApp
                ssrData={ssrData}
                ssrPath={match ? match.path : null}
            />
        </StaticRouter>,
    );

    const scriptTags = webExtractor.getScriptTags();

    const finalJsx = ReactDOMServer.renderToString(sheets.collect(html));

    const css = sheets.toString();

    res.set('content-type', 'text/html');

    const renderedHTML = render(finalJsx, scriptTags, css, ssrData, match);

    if (context.status === '404') {
        return res.status(404).send(renderedHTML);
    }

    res.status(200).send(renderedHTML);
};

export const indexRoute = function (req, res) {
    const { promises, route, match } = getDataPromises(req.path);

    if (promises.length > 0) {
        Promise.all(promises).then((initialState) => {
            renderRouteMarkup(req, res, initialState, route, match);
        });
    } else {
        renderRouteMarkup(req, res, null, route, match);
    }
};
