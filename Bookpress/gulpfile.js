var gulp = require('gulp'),
    gutil = require('gulp-util'),
    batch = require('gulp-batch'),
    mustache = require('gulp-mustache'),
    markdownIt = require('gulp-markdown-it'),
    fs = require('fs-extra'),
    path = require('path')
    ;

var pressConfig = require('./Press.config');

var mustacheEnv = {
    view: {
        msg: "Hello Gulp!"
    },
    partials: {}
};


function getMDPartialBlob()
{
    return pressConfig.MD.inputDirectory + '/**/*' + (
            (pressConfig.MD.partialExt) ?
            '.' + pressConfig.MD.partialExt : '');
}
function getHTMLInputBlob()
{
    return pressConfig.HTML.inputDirectory + '/**/*.md';
}
function loadAllMustachePartials(done) {

    //Reset partials
    mustacheEnv.partials = {};

    gulp.src(getMDPartialBlob())
        .on('data', function(vinyl){

            //Each vinyl here is a partial
            var partialName = ''+vinyl.relative;
            //Strip extension if there is one
            if(pressConfig.MD.partialExt)
            {
                partialName = partialName.substring(0, partialName.length - (pressConfig.MD.partialExt.length + 1));
            }
            //Normalize separators
            partialName = partialName.split(path.sep).join('/');
            var partialContents = vinyl.contents.toString();

            //Add debug comment to contents for easier identifying later
            partialContents = "<!-- "+partialName+" BEGIN -->" + partialContents;
            partialContents += "<!-- END "+partialName+" -->";

            mustacheEnv.partials[partialName] = partialContents;
        })
        .on('end', function(){
            gutil.log(
                "Found and loaded",
                gutil.colors.black.bgMagenta(Object.keys(mustacheEnv.partials).length),
                gutil.colors.reset("partials"));
            done();
        })
    ;
}

/**
 * Compile mustache/markdown to pure markdown
 * */
function mustache_to_markdownTask(done)
{
    gutil.log(gutil.colors.bold('Generating pure markdown from mustached markdown'));

    gutil.log(gutil.colors.blue('clearing output directory'));
    fs.removeSync(pressConfig.MD.outputDirectory);

    var fileCount = 0;
    gutil.log(
        gutil.colors.blue('compiling mustached markdown files'),
        gutil.colors.grey(pressConfig.MD.mainFile)
    );
    gulp.src(pressConfig.MD.mainFile)
        .on('data', function(vinyl){
            fileCount++;
        })
        .pipe(mustache(mustacheEnv.view, {}, mustacheEnv.partials))
        .pipe(gulp.dest(pressConfig.MD.outputDirectory))
        .on('end', function(){
            gutil.log(
                gutil.colors.blue('compiled ' + gutil.colors.white(fileCount) + ' files to '),
                gutil.colors.grey(pressConfig.MD.outputDirectory));
            done();
        })
    ;
}



/**
 * Compile markdown to html
 * */
function markdown_to_htmlTask(done)
{
    gutil.log(gutil.colors.bold('Generating HTML from pure markdown'));

    gutil.log(gutil.colors.blue('clearing output directory'));
    fs.removeSync(pressConfig.HTML.outputDirectory);

    var fileCount = 0;
    gutil.log(
        gutil.colors.blue('compiling markdown in'),
        gutil.colors.grey(pressConfig.HTML.inputDirectory)
    );
    gulp.src(getHTMLInputBlob())
        .pipe(markdownIt({
            options: pressConfig.HTML.markdown,
            plugins: []
        }))
        .on('data', function(vinyl){
            fileCount++;
        })
        .pipe(gulp.dest(pressConfig.HTML.outputDirectory))
        .on('end', function(){
            gutil.log(
                gutil.colors.blue('compiled ' + gutil.colors.white(fileCount) + ' files to '),
                gutil.colors.grey(pressConfig.HTML.outputDirectory));
            done();
        })
    ;
}

function cleanGeneratedTask(done)
{
    fs.removeSync(pressConfig.MD.outputDirectory);
    fs.removeSync(pressConfig.HTML.outputDirectory);
    done();
}

function generateMDTask(done)
{
    loadAllMustachePartials(function(err) {
        if(err)
        {
            done(err);
        } else {
            mustache_to_markdownTask(done);
        }
    });
}
function generateHTMLTask(done)
{
    markdown_to_htmlTask(done);
}

function generateAllTask(done)
{
    cleanGeneratedTask(function(err) {
        if(err)
        {
            done(err);
        } else {
            generateMDTask(function(err) {
                if(err)
                {
                    done(err);
                } else {
                    generateHTMLTask(done);
                }
            });
        }
    });
}

gulp.task('default', function() {
    // place code for your default task here
    console.warn("No default task specified");
});

gulp.task('clean:generated', cleanGeneratedTask);


gulp.task('load:MD-Partials', loadAllMustachePartials);
gulp.task('generate:MD', generateMDTask);
gulp.task('generate:HTML', generateHTMLTask);
gulp.task('generate:All', generateAllTask);



gulp.task('auto:generate:All', ['generate:All'], function(done) {

    gutil.log(gutil.colors.bold('Watching ' + gutil.colors.grey(pressConfig.MD.inputDirectory) + ' for changes...'));

    ///Batch the events so that multiple short-time changes only trigger once
    gulp.watch(getMDPartialBlob(), batch({
        timeout: 200
    }, function (events, cb) {

        gutil.log(gutil.colors.underline("Changes detected:"));
        events.on('data', function(event){

            var actionDescr = "Did something to ";
            var actionTarget = gutil.colors.dim.gray(event.path);
            switch(event.type)
            {
                case 'added':
                    actionDescr = gutil.colors.green("added ");
                    break;
                case 'changed':
                    actionDescr = gutil.colors.blue("changed ");
                    break;
                case 'deleted':
                    actionDescr = gutil.colors.yellow("removed ");
                    actionTarget = gutil.colors.strikethrough(actionTarget);
                    break;
            }

            gutil.log('\t', actionDescr, actionTarget);

        }).on('end', function(){
            generateAllTask(cb);
        });
    }));
});