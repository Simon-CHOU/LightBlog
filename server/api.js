// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
'use strict'
const models = require('./db')
const express = require('express')
const router = express.Router()

/** *********** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/blog/createBlog', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account: req.body.account,
        password: req.body.password
    })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
        res.send(err)
    } else {
        res.send('createAccount successed')
    }
  })
})

/** ***********            博客数据操作            **************/
// 轮播图
router.get('/api/getBanners', (req, res) => {
    models.Blog.getBanners().then((docs) => {
        res.send(docs)
    })
})
// 博客
router.get('/api/getBlogs', (req, res) => {
    let category = req.query.category
    let sub_category = req.query.sub_category
    models.Blog.getBlogs(1, 10,category,sub_category).then((docs) => {
        
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
// 获取博客摘要
router.get('/api/test', (req, res) => {
  models.Blog.find({}, ['abstract', 'category', 'cover', 'like', 'time', 'title', 'pageView'], (err, data) => {
    if (err) {
        res.send(err)
    } else {
        console.log(data)
        res.send(data)
    }
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
