var Elixir = require('laravel-elixir');
var config = Elixir.config;
var pkg = require('./package.json');

require('require-dir')('./tasks');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

Elixir(function(app) {

    /**
     * Clean Directorie
     */
    app.clean();

    /**
     * Font Application
     *
     * @vendor: font awesome
     */
    app.copy('./node_modules/font-awesome/fonts', './public/assets/fonts');

    /**
     * Images Application
     */
    app.copy('./app/assets/img', './public/assets/img');

    /**
     * Docs Stylesheet Application
     */
    app.sass(
        config.app.filename + '.scss',
        './public/assets/css/'+ config.app.filename +'.css'
    );

    /**
     * Javascript Application
     */
    app.browserify(
        config.app.filename + '.js',
        './public/assets/js/'+ config.app.filename +'.js'
    );

    /**
     * Docs HTML Application
     */
    app.jade({
        config: {
            pretty: true,
            locals: {
                mode: config.app.mode,
                title: config.app.title,
                filename: config.app.filename,
                base_url: config.server.host
            }
        }
    });

    /**
     * HTML Lint
     */
    app.htmlHint({
        source: [
            "./public/**/*.html"
        ],
        rcFile: ".htmlhintrc"
    });

    /**
     * BrowserSync
     */
    app.browserSync({
        notify: false,
        server: config.server.baseDir,
        proxy: config.server.proxy,
        files: [
            './public/**/*.html',
        ]
    });

});
