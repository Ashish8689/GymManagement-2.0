const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#470bb5',
                            '@success-color': '#17b978',
                            '@error-color': '#ff304f',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
