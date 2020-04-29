import React from 'react';
import ReactDOMServer from 'react-dom/server';
import render from './render';
import { StaticRouter } from 'react-router-dom';
import App from '../client/react-router';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

export const indexRoute = function (req, res) {
    const context = {};
    const sheets = new ServerStyleSheets();

    const html = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>,
        ),
    );
    const css = sheets.toString();
    res.send(render(html, css));
};
