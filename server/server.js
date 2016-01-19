;(function(){
	var connect = require('connect'),
		http = require('http'),
		serveStatic = require('serve-static'),
		path = require('path');
	app = connect();

	app.root =path.normalize(__dirname + '/../');
	//route
	require('./middleware/firstpage')(app);
	require('./middleware/blog')(app);
	require('./middleware/wiki')(app);

	app.use(serveStatic(app.root));

	app.use(function notfount(req, res, next) {
		console.log('404:' + req.url);
		res.statusCode = 404;
		res.end('page not found');
	});
	app.use(function onerror(err, req, res, next) {
		// an error occurred!
	});
//create node.js http server and listen on port
	http.createServer(app).listen(3000);
	console.log('server is start at port 3000');

})();