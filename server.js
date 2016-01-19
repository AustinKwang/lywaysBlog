var connect = require('connect'),
http = require('http'),
pathFn = require('path'),
serveStatic = require('serve-static'),
Remarkable = require('remarkable'),
file = require('fs'),
path = require('path'),
utlParser = require('url'),
md = new Remarkable('full'),
app = connect();
 
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

app.use('/', function indexMiddleware(req, res, next){
	var url = decodeURIComponent(req.url);
 	if(url === '/'){
		req.url = url + 'index/index.html';
		// console.log("re" + req.url);
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
    res.statusCode = 200;
	res.setHeader('Location', url);
  }
  next();
 
});

app.use('/wiki', function middleware1(req, res, next) {
  // req.url starts with "/foo" 
	var url = decodeURIComponent(req.url);
		if(url === '/' || url.indexOf('.md') < 0){
		next();
		return;
	}
	if(url.indexOf('.md') > 0){
		var dir =  path.join(__dirname, '/wiki/' + utlParser.parse(req.url).pathname);
		console.log('lp->' +dir);
		var stats = file.lstatSync(dir);
		console.log(stats);
		if(stats.isDirectory()){
			 console.log('is Dir');
			dir += '/sidebar.md';
		}
		file.readFile(dir, 'utf-8',function (err, data) {
		  if (err) {
			  console.log(err);
			  next();
			  // /throw err;
		  }else{
			  // console.log(data);
			  res.end(md.render(data));
		  }
		});
		return;
	}
});
app.use(serveStatic(__dirname));

app.use(function onerror(req, res, next) {
	res.statusCode = 404;
	res.end('page not found');
});
app.use(function onerror(err, req, res, next) {
  // an error occurred! 
});
//create node.js http server and listen on port 
http.createServer(app).listen(3000);
console.log('server is start at port 3000');
