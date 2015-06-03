var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    batch = require('gulp-batch'),

    fs = require('fs-extra'),
    path = require('path'),
    util = require('util')
    ;

/**
 Manages the compilation of style files (scss=>css)
 */
exports.config = {};

function getInputDirectory(){
    return path.join(__dirname, '..', exports.config.inputDirectory);
}
function getInputSCSSBlob(){
    return path.join(__dirname, '..', exports.config.inputDirectory, '/**/*.scss');
}

exports.Tasks = {
    generateCSS: function(done) {
        gutil.log(gutil.colors.bold('Generating css from sass'));
        gutil.log(gutil.colors.grey(getInputSCSSBlob()));
        gulp.src(getInputSCSSBlob())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(exports.config.outputDirectory))
            .on('end', function(err){
                done(err);
            });
    },

    autogenerateCSS: function(done){
        gutil.log(gutil.colors.bold('Watching ' + gutil.colors.grey(getInputSCSSBlob()) + ' for changes...'));
        gulp.watch(getInputSCSSBlob(), batch({
            timeout: 300
        }, function (events, cb) {
            exports.Tasks.generateCSS(cb);
        }));
    }
};