const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#7147E8',
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
