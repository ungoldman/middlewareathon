
/*
 * GET home page.
 */

exports.index = function(req, res){
  var sess = req.session;

  sess.views ? sess.views++ : sess.views = 1;

  res.render('index', {
    title: 'Middlewareathon',
    views: sess.views,
    expires: sess.cookie.maxAge / 1000
  });
};
