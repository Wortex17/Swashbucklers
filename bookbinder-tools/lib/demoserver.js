var gulp = require('gulp'),
    gutil = require('gulp-util'),
    batch = require('gulp-batch'),
    express = require('express'),
    morgan = require('morgan'),
    connectlr = require('connect-livereload'),
    livereload = require('gulp-livereload'),

    fs = require('fs-extra'),
    path = require('path'),
    util = require('util')
    ;

exports.config = {};

function getStaticPath()
{
    return path.join(__dirname, '..', exports.config.staticRootDirectory);
}

exports.Tasks = {
    startServer: function(done)
    {
        gutil.log(gutil.colors.bold('Starting demonstrative local server'));

        livereload.listen(exports.config.lrPort);

        var server = express();

        server.use(morgan('dev'));

        server.use(connectlr({
            port: exports.config.lrPort
        }));

        var staticPath = getStaticPath();
        server.use('/Swashbucklers', express.static(staticPath));
        gutil.log('Serving static files from', gutil.colors.grey(staticPath));

        server.listen(exports.config.port, function(err){
            if(err) {
                done(err)
            }
            else {
                gutil.log('Server listening on', gutil.colors.grey('http://localhost:'+exports.config.port+'/Swashbucklers/'));
                done();
            }
        });
    },

    livereload: function(done)
    {
        var staticPath = getStaticPath();
        var glob = staticPath + '/**/*';
        gutil.log('livereload watching', gutil.colors.grey(glob));

        gulp.watch(staticPath + '/**/*', batch({
            timeout: 300
        }, function (events, cb) {

            events.on('data', function(event){
                var p = path.relative(staticPath, event.path);
                livereload.changed(p);
            });

            events.on('end', cb);

        }));
    }
};