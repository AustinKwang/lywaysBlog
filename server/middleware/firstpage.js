/**
 * Created by austin on 16-1-19.
 */
(function(){
    function indexMiddleware(req, res, next){
        var url = decodeURIComponent(req.url);
        if(url === '/'){
            req.url = url + 'index/index.html';
            res.statusCode = 302;
            res.setHeader('Location', url + 'index/');
            res.end('Redirecting');
        }
        next();
    }
    module.exports = function(app){
        console.log('register first middlewate');
        app.use('/', indexMiddleware);
    }
})();


