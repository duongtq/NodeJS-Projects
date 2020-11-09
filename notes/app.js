const express = require('express');
const hbs = require('hbs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const approotdir = require('./approotdir');
const _dirname = approotdir;

const {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} = require('./appsupport.js');

const indexRouter =  require('./routes/index.js');
const notesRouter =  require('./routes/notes.js'); 

const app = express();

// view engine setup
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(_dirname, 'partials'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, 'public')));

// Router function lists
app.use('/', indexRouter);
app.use('/notes', notesRouter);

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
const address = server.address();

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
