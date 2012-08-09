
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , app = express()

  /**
   * Third-party middleware dependencies.
   */

  , partials = require('express-partials')
  , less = require('less-middleware')
  ;

/**
 * Config block.
 */

app
  .set('port', process.env.PORT || 3000)
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')
  .use(express.bodyParser())
  .use(express.methodOverride())

  /**
   * Connect middleware.
   */

  .use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }))
  .use(express.cookieParser('advice dog'))
  .use(express.session({ key: 'woof', cookie: { maxAge: 10000 }}))

  /**
   * Third-party middleware.
   */

  .use(less({ src: __dirname + '/public', compress: true }))
  .use(partials())

  .use(app.router)
  .use(express.static( __dirname + '/public' ))

  .configure('development', function(){
    app
      .use(express.logger('dev'))
      .use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  })

  .configure('production', function(){
    app
      .use(express.logger())
      .use(express.errorHandler())
  })

  // app.get() returns Router object
  .get('/', routes.index)
  ;

// app.listen() returns Server object
var server = app.listen(app.get('port'));

console.log("Express server listening on port " + server.address().port);
