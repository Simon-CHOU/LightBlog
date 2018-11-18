const webpack = require('webpack');
const path = require('path')
const vendors = [
    "hc-sticky",
    "highlight.js",
    "jquery",
    "marked",
    "scrollreveal",
    "vue",
    "vue-resource",
    "vue-router",
    "vue-scroll"
];

module.exports = {
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    entry: {
        "vendor": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../', '[name]-manifest.json'),
            name: '[name]'
        })
    ],
};