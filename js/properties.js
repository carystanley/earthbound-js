var npmProperties = require('../package.json');

module.exports = {
    title: 'Earthbound.js',
    description: npmProperties.description,
    port: 3017,
    liveReloadPort: 3018,
    mute: false,
    showStats: true,
    size: {
        x: 256,
        y: 224
    },
    analyticsId: 'UA-5075951-7'
};
