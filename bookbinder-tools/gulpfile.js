var gulp = require('gulp'),
    gutil = require('gulp-util'),
    batch = require('gulp-batch')
    ;

var barber = require('./lib/barber'),
    markdowner = require('./lib/markdowner'),
    styler = require('./lib/styler'),
    demoserver = require('./lib/demoserver')
    ;

var bookconfig = require('./book.config.js');

barber.config = bookconfig.barber;
markdowner.config = bookconfig.markdowner;
styler.config = bookconfig.styler;
demoserver.config = bookconfig.demoserver;

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

    generateAllButStyle: function(done)
    {
        barber.Tasks.generateMD(function(err) {
            if(err)
            {
                done(err);
            } else {
                markdowner.Tasks.generateHTML(done);
            }
        });
    },
    generateAll: function(done)
    {
        barber.Tasks.generateMD(function(err) {
            if(err)
            {
                done(err);
            } else {
                markdowner.Tasks.generateHTML(function(err) {
                    if(err)
                    {
                        done(err);
                    } else {
                        styler.Tasks.generateCSS(done);
                    }
                });
            }
        });
    },

    autogenerateAll: function(done)
    {

        styler.Tasks.autogenerateCSS(done);

        gutil.log(gutil.colors.bold('Watching ' + gutil.colors.grey(bookconfig.barber.inputDirectory) + ' for changes...'));

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
                tasks.generateAllButStyle(cb);
            });
        }));
    },

    autoServe: function(done) {
        demoserver.Tasks.startServer(function (err) {
            if (err)
                done(err);
            else {
                demoserver.Tasks.livereload(done);
            }
        });
    },

    autoAll: function(done) {
        tasks.autogenerateAll(done);
        tasks.autoServe(done);
    }
};

gulp.task('clean:generated', tasks.cleanGenerated);


gulp.task('load:markdown-partials', barber.Tasks.loadAllPartials);
gulp.task('generate:markdown', barber.Tasks.generateMD);
gulp.task('generate:html', markdowner.Tasks.generateHTML);
gulp.task('generate:css', styler.Tasks.generateCSS);
gulp.task('generate:all', tasks.generateAll);
gulp.task('serve', demoserver.Tasks.startServer);
gulp.task('auto:serve', tasks.autoServe);




gulp.task('auto:generate:css', ['generate:css'], styler.Tasks.autogenerateCSS);
gulp.task('auto:generate:all', ['generate:all', 'generate:css'], tasks.autogenerateAll);
gulp.task('auto:all', ['generate:all', 'generate:css'], tasks.autoAll);