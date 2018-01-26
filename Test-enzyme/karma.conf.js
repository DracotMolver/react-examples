module.exports = function karmaConfig(config) {
    config.set({
        // -=============== Configuración webpack ===============-
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /\/node_modules\//,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['airbnb'],
                                plugins: ['syntax-dynamic-import'],
                                compact: true
                            }
                        }
                    }
                ]
            }
        },

        // base path  que se usará para igualar todos las expresiones (eg. files, exclude)
        basePath: '',

        // frameworks a usar. disponibles: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // Listas de archivos o una expreción regular.
        // La lista de archivos puede ser basada en una configuración global
        files: [
            {
                pattern: 'setup.js',
                watched: false,
                included: true
            }
        ],

        // Lista de archivos a excluir
        // exclude: [],

        // preprocesadores para igualar archivos antes de enviarlos
        // al servidor. disponibles: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'setup.js': ['webpack']
        },

        // Reporte del resultado del test
        // posibles valores: 'dots', 'progress'
        // disponibles: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // Puerto webserver
        port: 4405,

        // Activar o desactivar colores (reportes y  logs)
        colors: true,

        // Niveles de los logs
        // Valores: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Activar o desactivar la observación de cambios sobre un archivo
        autoWatch: false,


        // Iniciar el navegador(es) definido(s)
        // disponibles: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],/*, 'Firefox'*/


        // CI - Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: true,

        // Concurrency level
        // cuantos navegadores se debería de inicializar
        concurrency: Infinity,

        client: {
            // Capture all console output and pipe it to the terminal.
            captureConsole: true,
        }

        // When true, this will append the crossorigin attribute to generated script tags,
        // which enables better error reporting for JavaScript files served from a different origin.
        // Disable this when you need to load external scripts that are served without the necessary Access-Control-Allow-Origin header.
        // crossOriginAttribute: false,

        // browserNoActivityTimeout: 60000 // 60 seconds
    })
};