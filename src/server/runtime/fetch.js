import fetch from 'node-fetch';

const runtime = (req) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    global.fetch = (url, ...rest) => {
        let modifiedUrl;
        try {
            modifiedUrl = new URL(url);
        } catch (e) {
            // url provided above is relative
            modifiedUrl = new URL(url, baseUrl);
        }
        return fetch(modifiedUrl, ...rest);
    };
};

export default runtime;
