import React, { useState, useEffect } from 'react';

const View = (props) => {
    const { ssrData, fetchData, Component, path, ssrPath } = props;

    const modifiedSSR = ssrPath === path ? ssrData : null;

    const [data, setData] = useState(modifiedSSR);

    useEffect(() => {
        if (ssrPath !== null && modifiedSSR === null && fetchData) {
            fetchData().then((data) => {
                setData(data);
            });
        }
    }, []);
    return <Component ssrData={data} path={path} />;
};

export default View;
