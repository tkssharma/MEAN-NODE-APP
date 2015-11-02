
        var wine = require('./routes/wines');
        // call the packages we need
        var express    = require('express');        // call express // define our app using express
        var http = require('http');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var path = require('path');
        var logger = require('morgan');

        var app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(logger('dev'));
        app.set('view engine', 'ejs');
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'html');
        app.use(express.logger('dev'));
        app.use(express.static(path.join(__dirname, 'public')));



// =============================================================================
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
// BASE SETUP
// =============================================================================
// ROUTES FOR OUR API
// =============================================================================

        app.get('/api/wines', wine.findAll);
        app.get('/api/wines/:id', wine.findById);
        app.post('/api/wines', wine.addWine);
        app.put('/api/wines/:id', wine.updateWine);
        app.delete('/api/wines/:id', wine.deleteWine);




        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });


        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
