var gulp = require('gulp'),
    gutil = require('gulp-util'),
    batch = require('gulp-batch')
    ;

var barber = require('./lib/barber'),
    markdowner = require('./lib/markdowner'),
    demoserver = require('./lib/demoserver')
    ;

var letterpress = require('./letterpress.js');

barber.config = letterpress.barber;
markdowner.config = letterpress.markdowner;
demoserver.config = letterpress.demoserver;

var tasks = {
    cleanGenerated: function(done)
    {
        barber.Tasks.clean(function(err){
            if(err)
                done(err);
            else
                markdowner.Tasks.clean(done);
        });
    },

    generateAll: function(done)
    {
        barber.Tasks.generateMD(function(err) {
            if(err)
            {
                done(err);
            } else {
                markdowner.Tasks.generateHTML(done);
            }
        });
    }
};

gulp.task('clean:generated', tasks.cleanGenerated);


gulp.task('load:markdown-partials', barber.Tasks.loadAllPartials);
gulp.task('generate:markdown', barber.Tasks.generateMD);
gulp.task('generate:html', markdowner.Tasks.generateHTML);
gulp.task('generate:all', tasks.generateAll);
gulp.task('serve', function(done){
    demoserver.Tasks.startServer(function(err){
        if(err)
            done(err);
        else {
            demoserver.Tasks.livereload(done);
        }
    });
});



gulp.task('auto:generate:all', ['generate:all'], function(done) {

    gutil.log(gutil.colors.bold('Watching ' + gutil.colors.grey(letterpress.markdowner.inputDirectory) + ' for changes...'));

    ///Batch the events so that multiple short-time changes only trigger once
    gulp.watch(barber.getPartialsBlob(), batch({
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
            tasks.generateAll(cb);
        });
    }));
});