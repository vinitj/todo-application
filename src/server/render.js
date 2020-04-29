import Assets from '../../webpack-assets.json';

const render = (html, css) => {
    const { js } = Assets.app;
    return `<html>
    <head>
        <title>Docker Tutorial </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style id="material-server-side">${css}</style>
    </head>
    <body>
        <div id="app">${html}</div>
        <script src="${js}"></script>
    </body>
</html>`;
};

export default render;
