
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
  , assets = require('connect-assets')
  ;

/**
 * Config block.
 */

app
  .set('port', process.env.PORT || 3000)
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')

  /**
   * Connect middleware.
   */

  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.cookieParser('advice dog'))
  .use(express.session({ key: 'woof', cookie: { maxAge: 23000 }}))
  .use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }))
  .use(express.staticCache())
  .use(express.static( __dirname + '/public' ))

  /**
   * Third-party middleware.
   */

  .use(partials())
  .use(assets())

  /**
   * Environment-specific configs.
   */

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

  .use(app.router)

  // app.get() returns Router object
  .get('/', routes.index)
  ;

// app.listen() returns Server object
var server = app.listen(app.get('port'));

console.log("Express server listening on port " + server.address().port);
