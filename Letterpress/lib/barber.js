var gulp = require('gulp'),
    gutil = require('gulp-util'),
    mustache = require('gulp-mustache'),

    fs = require('fs-extra'),
    path = require('path'),
    util = require('util')
    ;

/**
 Manages the barbering phase (composition of mustache/markdown files into markdown files)
 */

var mustacheEnv = {
    view: {},
    partials: {}
};

exports.config = {};
exports.mustacheEnvironment = mustacheEnv;

function getPartialsBlob()
{
    return exports.config.inputDirectory + '/**/*' + (
            (exports.config.partialExt) ?
            '.' + exports.config.partialExt : '');
}
exports.getPartialsBlob = getPartialsBlob;

exports.Tasks = {
    clean: function(done)
    {
        var err;
        try {
            fs.removeSync(exports.config.outputDirectory);
        } catch(e) {
            err = e;
        }
        done(err);
    },

    loadAllPartials: function(done)
    {
        //Reset partials
        mustacheEnv.partials = {};

        gutil.log(gutil.colors.bold('Loading mustache/markdown partials'));

        gulp.src(getPartialsBlob())
            .on('data', function(vinyl){

                //Each vinyl here is a partial
                var partialName = ''+vinyl.relative;
                //Strip extension if there is one
                if(exports.config.partialExt)
                {
                    partialName = partialName.substring(0, partialName.length - (exports.config.partialExt.length + 1));
                }
                //Normalize separators
                partialName = partialName.split(path.sep).join('/');
                var partialContents = vinyl.contents.toString();

                if(exports.config.insertDebugMarkers) {
                    //Add debug comment to contents for easier identifying later
                    partialContents = "<!-- " + partialName + " BEGIN -->" + partialContents;
                    partialContents += "<!-- END " + partialName + " -->";
                }

                mustacheEnv.partials[partialName] = partialContents;
            })
            .on('end', function(err){

                if(exports.config.insertDebugMarkers) {
                    gutil.log("Inserted debug markers");
                }

                gutil.log(
                    "Found and loaded",
                    gutil.colors.black.bgMagenta(Object.keys(mustacheEnv.partials).length),
                    gutil.colors.reset("partials"));

                done(err);
            })
        ;
    },

    loadDefinitions: function(done)
    {
        var language = 'english';
        gutil.log(gutil.colors.bold('Loading definitions for language:'+language));

        mustacheEnv.view = {};

        var definitions = exports.config.definitions;

        var usedDefinitions = definitions['*'];

        //Extend used definitions with those for the currently set language
        if(!definitions.hasOwnProperty(language))
        {
            done(new Error("definitions contain no list for language:" + language));
            return;
        }
        usedDefinitions = usedDefinitions.concat(definitions[language]);

        //Now load all definitions
        var combinedDefinitions = {};
        gutil.log("Combining definitions...");
        usedDefinitions.forEach(function(deffile){

            var defpath = deffile;
            if(!path.isAbsolute(deffile))
            {
                defpath = path.join(__dirname, '..', defpath);
            }

            gutil.log("   "+gutil.colors.grey(deffile));

            var defdata = require(defpath);
            combinedDefinitions = util._extend(combinedDefinitions, defdata);
        });
        mustacheEnv.view = combinedDefinitions;
        gutil.log("Final definitions database with "+Object.keys(combinedDefinitions).length+" top-level entries");

        done();


    },

    generateMD: function(done)
    {
        gutil.log(gutil.colors.bold('Generating pure markdown from mustached markdown'));

        gutil.log(gutil.colors.blue('clearing output directory'));

        exports.Tasks.clean(function(err){
            if(err)
            {
                done(err);
            }
            else {
                exports.Tasks.loadAllPartials(function(err){
                    if(err)
                    {
                        done(err);
                    } else {
                        loadDefs(done);
                    }
                });
            }
        });

        function loadDefs(done){
            exports.Tasks.loadDefinitions(function(err){
                if(err)
                {
                    done(err)
                } else {
                    generate(done);
                }
            });
        }

        function generate(done){
            var fileCount = 0;
            gutil.log(
                gutil.colors.blue('compiling mustached markdown files'),
                gutil.colors.grey(exports.config.mainFile)
            );
            gulp.src(exports.config.mainFile)
                .on('data', function(vinyl){
                    fileCount++;
                })
                .pipe(mustache(mustacheEnv.view, {}, mustacheEnv.partials))
                .pipe(gulp.dest(exports.config.outputDirectory))
                .on('end', function(){
                    gutil.log(
                        gutil.colors.blue('compiled ' + gutil.colors.white(fileCount) + ' files to '),
                        gutil.colors.grey(exports.config.outputDirectory));
                    done();
                })
            ;
        }

    }
};