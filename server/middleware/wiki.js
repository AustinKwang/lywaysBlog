/**
 * Created by austin on 16-1-19.
 */
(function(){
    var Remarkable = require('remarkable'),
        md = new Remarkable('full'),
        file = require('fs'),
        utlParser = require('url'),
        path = require('path')
        root;
    function wikiMiddleware(req, res, next) {
        // req.url starts with "/foo"
        var url = decodeURIComponent(req.url);
        if(url === '/' || url.indexOf('.md') < 0){
            next();
            return;
        }
        if(url.indexOf('.md') > 0){
            var dir =  path.normalize(root + '/wiki/' + utlParser.parse(req.url).pathname);
            console.log('lp->' +dir);
            var stats = file.lstatSync(dir);
            if(stats.isDirectory()){
                console.log('is Dir');
                dir += '/sidebar.md';
            }
            file.readFile(dir, 'utf-8',function (err, data) {
                if (err) {
                    console.log(err);
                    next();
                }else{
                    res.end(md.render(data));
                }
            });
            return;
        }
    }

    module.exports = function(app){
        root = app.root;
        console.log('register wiki middlewate:' + root);
        app.use('/wiki', wikiMiddleware);
    }
})();
