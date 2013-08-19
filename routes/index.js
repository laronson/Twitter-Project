
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Len' });
};

exports.search = function(req, res){
	res.render('index', { title: 'Search'})
}