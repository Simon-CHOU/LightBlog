# LightBlog
>  # **一、将数据导入数据库**    
>  1. 确保mongoDB中有 **light_blog**数据库，其中含有 **blog** 和 **menu** 两个 **collection**.   
>
>  2. 删除**blog** 和 **menu**中的原有数据.   
>
>  2. 项目数据位于**DataBase**文件夹内，**JSON** 格式.      
>
>  3. 在mongoDB安装目录中的 **bin** 内，执行以下指令，即可导入数据.   
`mongoimport --db light_blog --collection blog --type json  文件路径/文件名.json --jsonArray`

   
>  # **二、运行项目**    
>  1. 在LightBlog目录内执行 `npm install`.
>
>  2. 在LightBlog目录内执行 `npm run build`.   
>
>  3. 在LightBlog/server目录内执行 `node index`.   
> + *若执行 `npm install`时出现关于 `node-sass`、`python`的错误，需要翻墙或者使用阿里的镜像进行安装*      



>  # **三、现有功能**    
>  1. `首页` 内可以查看所有博客信息，点击博客信息可跳转都 `详情页面`.
>
>  2. 在 `前端开发/数据可视化` 页面内, 可以分类查询博客信息, 点击博客信息可跳转到 `详情页面`.   
>
>  3. 在 `时间轴` 页面内,  可以看到按时间排列的博客列表, 点击博客信息可跳转到 `详情页面`.     
>
>  4. 在任意页面，点击博客信息，即可进入博客 `详情页面`.     
>
>  5. 在 `详情页面` 中，可以看到文章的相关详细内容，可以进行 `评论`.
>   
>  6. ~~在 `写博客` 页面中，进行MarkDown博客的编写，但是还不能发布.~~
 


 >  # **四、待添加功能**    
>  1. `首页、详情页面、时间轴` 均需要添加分页功能.
>
>  2. ~~`Header` 插件中的搜索功能~~.
>
>  3. ~~`首页` 中的词云~~.
>
>  4. ***在 `详情页面` 内,  实现`tags`、`点赞`、`浏览量`等统计功能***.     
>
>  5. 在 `详情页面` 内,  需要美化评论表单.     
>
>  6. `关于页面、留言页面`的编写 .      
>
>  7. ***`写博客`页面中，编写完成的博客可以发布，重点是多张图片的处理***.     
>
>  8. ***`写博客`页面中，能提示用户选择博文的分类、摆放***.   
>
>  9. ~~~`后台管理`，可以对所有的博客进行二次编辑，同时能够调整其`摆放位置`~~~.
>



