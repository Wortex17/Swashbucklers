var gulp = require('gulp'),
    gutil = require('gulp-util'),
    markdownIt = require('gulp-markdown-it')
    fs = require('fs-extra'),
    path = require('path')
    ;

/**
 Manages the markdowning phase (compilation of markdown files to html files)
 */

exports.config = {};

function getHTMLInputBlob()
{
    return exports.config.inputDirectory + '/**/*.md';
}

exports.Tasks = {
    clean: function (done) {
        var err;
        try {
            fs.removeSync(exports.config.outputDirectory);
        } catch (e) {
            err = e;
        }
        done(err);
    },

    generateHTML: function(done)
    {
        gutil.log(gutil.colors.bold('Generating HTML from pure markdown'));

        gutil.log(gutil.colors.blue('clearing output directory'));

        if(exports.config.cleanOnGeneration) {
            exports.Tasks.clean(function (err) {
                if (err) {
                    done(err);
                }
                else {
                    generate(done);
                }
            });
        } else {
            generate(done);
        }

        function generate(done) {

            var fileCount = 0;
            gutil.log(
                gutil.colors.blue('compiling markdown in'),
                gutil.colors.grey(exports.config.inputDirectory)
            );
            gulp.src(getHTMLInputBlob())
                .pipe(markdownIt({
                    options: exports.config['markdown-it'],
                    plugins: []
                }))
                .on('data', function (vinyl) {
                    fileCount++;
                })
                .pipe(gulp.dest(exports.config.outputDirectory))
                .on('end', function (err) {
                    gutil.log(
                        gutil.colors.blue('compiled ' + gutil.colors.white(fileCount) + ' files to '),
                        gutil.colors.grey(exports.config.outputDirectory));
                    done(err);
                })
            ;
        }
    }
}