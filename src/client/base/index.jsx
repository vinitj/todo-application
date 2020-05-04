import React, { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

const MainBase = (props) => {
    const { children } = props;
    useEffect(() => {
        const jssStyles = document.querySelector('#material-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Router>
            {children({
                ssrData: window.__SSR_DATA__,
                ssrPath: window.__SSR_PATH__,
            })}
        </Router>
    );
};

export default MainBase;
