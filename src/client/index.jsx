import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import AllRoutes from './react-router';

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
            <AllRoutes />
        </Router>
    );
}

ReactDOM.render(<Main />, document.getElementById('app'));
