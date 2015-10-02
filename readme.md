### lyways Blog inital
---
The blog system is build by [Hexo](http://hexo.io/)! you can get document from [documentation](http://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](http://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues). 

## Initial in local
1. install the Hexo by npm.
    ```bash
    $ npm install -g hexo
    $ hexo version
    ```
2. step into hexo project root directory 
    如： D:\Dev_Env\Project\GitProject\hexo
3. Create a new post(a new blog)
    ``` bash
    $ hexo new "My New Post"
    ```
    More info: [Writing](http://hexo.io/docs/writing.html)

4. Run server to check
    ``` bash
    $ hexo server
    ```
    More info: [Server](http://hexo.io/docs/server.html)

5. Generate static files

    ``` bash
    $ hexo generate
    ```

    More info: [Generating](http://hexo.io/docs/generating.html)

6. Deploy to remote sites, in this will automatic deploy to github.
    ``` bash
    $ hexo deploy
    ```
    More info: [Deployment](http://hexo.io/docs/deployment.html)