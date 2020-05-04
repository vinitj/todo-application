import React from 'react';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
    const { children } = props;

    return (
        <div role="tabpanel">
            <Box p={3}>{children}</Box>
        </div>
    );
};

export default TabPanel;
