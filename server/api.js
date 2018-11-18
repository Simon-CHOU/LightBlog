// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
'use strict'
const models = require('./db')
const express = require('express')
var moment = require('moment');
moment.locale('zh-cn');
const router = express.Router()

/** *********** POST样例 **************/

// 添加评论
router.post('/api/addComment', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let blogId = req.body.blogId;
    let name = req.body.name;
    let content = req.body.content;

    var today = {};
    var _today = moment();
    today.date = _today.format('YYYY-MM-DD HH:mm:ss'); /*现在的时间*/
    
    models.Blog.update({'_id': blogId}, 
        {
            '$push': {
            comments: {
                author: name,
                content: content,
                time:today.date
            }
            }
        },
        function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send('succees')
            }
        }
      );
})

// 添加回复
router.post('/api/addReply', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let blogId = req.body.blogId;
    let commentId = req.body.commentId;
    let name = req.body.name;
    let content = req.body.content;

    var today = {};
    var _today = moment();
    today.date = _today.format('YYYY-MM-DD HH:mm:ss'); /*现在的时间*/

    models.Blog.findById(blogId, function(err, blog){
        for(var i = 0; i < blog.comments.length; i++){
            if(blog.comments[i]._id==commentId){
                //console.log(blog.comments[i])
                let temp = {author:name,content:content,time:today.date}
                blog.comments[i].comments.push(temp);
                blog.markModified('comments');

                blog.save(function(err){
                    res.json({status: 1, error: '修改成功！'});
                    return;
                }); 
            }
        }
    })
})

// 添加浏览量
router.post('/api/addPageView', (req, res) => {
    let blogId = req.body.blogId;

    models.Blog.findById(blogId, function(err, blog){
        blog.pageView++;
        blog.markModified('pageView');
        blog.save(function(err){
            res.json({status: 1, error: '修改成功！'});
            return;
        }); 
    })
})

// 添加点赞量
router.post('/api/updateLike', (req, res) => {
    let blogId = req.body.blogId;
    let num = req.body.num;

    models.Blog.findById(blogId, function(err, blog){
        blog.like+=parseInt(num);
        blog.markModified('like');
        blog.save(function(err){
            res.json({status: 1, error: '修改成功！'});
            return;
        }); 
    })
})

/** ***********            博客数据操作            **************/
// 轮播图
router.get('/api/getBanners', (req, res) => {
    models.Blog.getBanners().then((docs) => {
        res.send(docs)
    })
})
// 所有博客
router.get('/api/getBlogs', (req, res) => {
    let category = req.query.category
    let sub_category = req.query.sub_category
    models.Blog.getBlogs(1, 10,category,sub_category).then((docs) => {
        res.send(docs)
    })
})
// 单个博客
router.get('/api/getBlog', (req, res) => {
    let blogId = req.query.blogId
    models.Blog.getBlog(blogId).then((docs) => {
        res.send(docs)
    })
})

// 单个博客的评论
router.get('/api/getComment', (req, res) => {
    let blogId = req.query.blogId
    models.Blog.getComment(blogId).then((docs) => {
        res.send(docs)
    })
})
// 推荐
router.get('/api/getRecommends', (req, res) => {
    models.Blog.getRecommends().then((docs) => {
        res.send(docs)
    })
})
// 专题
router.get('/api/getSubjects', (req, res) => {
    models.Blog.getSubjects().then((docs) => {
        res.send(docs)
    })

})
// 置顶
router.get('/api/getToppics', (req, res) => {
    models.Blog.getToppics().then((docs) => {
        res.send(docs)
    })

})
// 时间轴
router.get('/api/getTimeLine', (req, res) => {
    models.Blog.getTimeLine().then((docs) => {
        res.send(docs)
    })
})
/** ***********            菜单数据操作            **************/
// 置顶
router.get('/api/getMenu', (req, res) => {
    models.Menu.getMenu().then((docs) => {
        res.send(docs)
    })

})




module.exports = router
