var connect = require('connect');
var http = require('http');
var pathFn = require('path');
var serveStatic = require('serve-static');
var app = connect();
 
// gzip/deflate outgoing responses 
// var compression = require('compression')
// app.use(compression())
 
// store session state in browser cookie 
// var cookieSession = require('cookie-session')
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }))
 
// parse urlencoded request bodies into req.body 
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded())
 
// respond to all requests 
// app.use(function(req, res){
//   res.end('Hello from Connect!\n');
// })

app.use(serveStatic(__dirname));

app.use(function indexMiddleware(req, res, next){
	var url = decodeURIComponent(req.url);
	console.log("/---->" + url);
 	if(url === '/'){
		req.url = url + 'index/index.html';
		console.log("re" + req.url);
		res.statusCode = 302;
	 	res.setHeader('Location', url + 'index/');
		res.end('Redirecting');
 	}
 	next();
});
app.use('/blog', function middleware1(req, res, next) {
  // req.url starts with "/foo" 
  var url = decodeURIComponent(req.url);
  var extname = pathFn.extname(url);
  if(!extname){
    req.url = url + '/index.html';
    res.statusCode = 302;
	res.setHeader('Location', url);
	res.end('Redirecting');
  }
  next();
 
});

app.use(function onerror(err, req, res, next) {
  // an error occurred! 
});
//create node.js http server and listen on port 
http.createServer(app).listen(80);
console.log('server is start');
