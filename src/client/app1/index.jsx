import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import MainBase from '../base/index';
import AppRender from './node';

function MainRender() {
    return <MainBase>{(props) => <AppRender {...props}></AppRender>}</MainBase>;
}

loadableReady(() => {
    const root = document.getElementById('app');
    // Ideally it should be hydrate but throwing some extra div error and hence not using it for now
    // For prod nothinh to worry as you can use anything
    hydrate(<MainRender />, root);
});
