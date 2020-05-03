import React, { useEffect } from 'react';
import { render } from 'react-dom';
import AllRoutes from './react-router';

import { loadableReady } from '@loadable/component';

import { BrowserRouter as Router } from 'react-router-dom';

function Main() {
    useEffect(() => {
        const jssStyles = document.querySelector('#material-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Router>
            <AllRoutes
                ssrData={window.__SSR_DATA__}
                ssrPath={window.__SSR_PATH__}
            />
        </Router>
    );
}

loadableReady(() => {
    const root = document.getElementById('app');
    render(<Main />, root);
});
