import React from 'react';
import ReactRouterBase from '../base/react-router';
import allRoutes from './routes';
import Layout from './components/layout';

export default function AppRender(props) {
    return (
        <>
            <Layout items={allRoutes}>
                <ReactRouterBase {...props} allRoutes={allRoutes} />
            </Layout>
        </>
    );
}
