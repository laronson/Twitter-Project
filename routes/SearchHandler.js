
var ApiPlay = require('./GooglePlayAround')



exports.search = function(req, res){
	res.render('search', { title: 'Search'})
}

exports.buttonget = function(req, res){
	ApiPlay.init(req, res)
}
