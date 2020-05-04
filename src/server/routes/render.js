const render = (html, scriptTags, css, initialState, match) => {
    return `<html>
    <head>
        <title>Docker Tutorial </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style id="material-server-side">${css}</style>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
            window.__SSR_DATA__ = ${
                initialState ? JSON.stringify(initialState) : null
            };
        </script>
        <script>
            window.__SSR_PATH__ = ${match ? JSON.stringify(match.path) : null};
        </script>
        ${scriptTags}
    </body>
</html>`;
};

export default render;
