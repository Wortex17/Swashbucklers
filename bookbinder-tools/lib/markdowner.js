var gulp = require('gulp'),
    gutil = require('gulp-util'),
    markdownIt = require('gulp-markdown-it'),
    fs = require('fs-extra'),
    path = require('path'),
    util = require('util')
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
    cleanInput: function (done) {
        var err;
        try {
            fs.removeSync(exports.config.inputDirectory);
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

            var icons = require(path.join(__dirname, '..', exports.config.icons));

            var fileCount = 0;
            gutil.log(
                gutil.colors.blue('compiling markdown in'),
                gutil.colors.grey(exports.config.inputDirectory)
            );
            gulp.src(getHTMLInputBlob())
                .pipe(markdownIt({
                    options: util._extend(exports.config['markdown-it'], {
                        replaceLink: function (link, env) {
                            if(link.length > 0)
                            {
                                //Link relative to base path, append real base
                                if(link[0] == "/" && link.indexOf("/Swashbucklers") != 0)
                                {
                                    return "/Swashbucklers" + link;
                                }
                                //Shortcut to assets
                                else if(link.indexOf("$/") == 0) {
                                    return "/Swashbucklers/book_assets/" + link.slice(2);
                                }
                            }
                        }
                    }),
                    plugins: [
                        'markdown-it-replace-link',
                        ['markdown-it-emoji', {defs:icons}]
                    ],
                    configure: function(md)
                    {
                        var originalEmojiRenderer = md.renderer.rules.emoji;
                        md.renderer.rules.emoji = function(token, idx) {

                            return '<span title="'+token[idx].markup+'" class="icon '+token[idx].content+'"></span>';

                        };

                    }
                }))
                .on('data', function (vinyl) {
                    fileCount++;
                })
                .pipe(gulp.dest(exports.config.outputDirectory))
                .on('end', function (err) {
                    gutil.log(
                        gutil.colors.blue('compiled ' + gutil.colors.white(fileCount) + ' files to '),
                        gutil.colors.grey(exports.config.outputDirectory));

                    if(exports.config.cleanInputOnGeneration) {
                        exports.Tasks.cleanInput(function (err) {
                            if (err) {
                                done(err);
                            }
                            else {
                                done();
                            }
                        });
                    } else {
                        done(err);
                    }
                })
            ;
        }
    }
}