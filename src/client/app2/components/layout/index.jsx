import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabPanel from './tabpanel';
import Box from '@material-ui/core/Box';
import { useHistory, useLocation } from 'react-router-dom';

const getTabValue = (items, path) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].path === path) {
            return i;
        }
    }
    return -1;
};

const CustomTab = (props) => {
    const { label, href, id, onTabChange } = props;
    const tabChange = (event) => {
        event.preventDefault();
        onTabChange(href);
    };

    return <Tab onClick={tabChange} label={label} href={href} id={id}></Tab>;
};

const Layout = (props) => {
    const { children, items } = props;
    const history = useHistory();
    const location = useLocation();
    const tabInit = getTabValue(items, location.pathname);
    const [value, setValue] = useState(tabInit);

    const onHandleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getTabs = () => {
        return items.map((item, index) => (
            <CustomTab
                key={`tab-${index}`}
                onTabChange={onTabChange}
                label={item.label}
                href={item.path}
                id={`tab-${index}`}
            />
        ));
    };
    const onTabChange = (href) => {
        history.push(href);
    };

    useEffect(() => {
        setValue(tabInit);
    }, [tabInit]);

    return (
        <Box p={10}>
            <Paper elevation={3} style={{ width: 600 }}>
                <AppBar
                    color="primary"
                    position="static"
                    style={{ height: 64 }}
                >
                    <Toolbar style={{ height: 64 }}>
                        <Typography color="inherit">
                            My Docker Example App2 Layout
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AppBar
                    color="transparent"
                    position="static"
                    style={{ height: 48 }}
                >
                    <Tabs
                        variant="standard"
                        value={value}
                        onChange={onHandleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {getTabs()}
                    </Tabs>
                </AppBar>
                <TabPanel>{children}</TabPanel>
            </Paper>
        </Box>
    );
};
export default Layout;
