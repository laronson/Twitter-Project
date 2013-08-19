

exports.index = function(req, res){
  res.render('index', { title: 'Len' });
};


exports.init = function(req, res, info){
	var info2 = new Array()
		, hello = 100;


	info2[0]= 1
	res.render('gapi', {API_KEY: "process.env.GOOGLEMAPS_KEY", array: hello})

}