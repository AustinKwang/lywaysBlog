/**
 * Created by austin on 16-1-19.
 */
(function(){
    var pathFn = require('path');

    /**
     * Handle url which start with /blog.
     * @param req
     * @param res
     * @param next
     */
    function blogMiddleware(req, res, next) {
        var url = decodeURIComponent(req.url);
        var extendName = pathFn.extname(url);
        console.log('blog')
        if(!extendName){
            req.url = url + 'index.html';
            res.statusCode = 200;
            res.setHeader('Location', url);
/*            res.statusCode = 200;
            res.setHeader('Location', url);
            res.end('Redirecting');*/
        }
        next();

    }
    module.exports = function(app){
        console.log('register blog middlewate');
        app.use('/blog', blogMiddleware);
    };

})();
