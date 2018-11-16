// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成

mongoose.connect("mongodb://localhost:27017/light_blog", {useNewUrlParser:true}, function(err){

　　if(err){

　　　　console.log('Connection Error:' + err)

　　}else{

　　　　console.log('Connection success!') }

})
// 为这次连接绑定事件
const db = mongoose.connection
/** *********** blogSchema **************/
const blogSchema = mongoose.Schema({
  author: String,         //作者
  abstract: String,       //摘要
  category: String,       //分类
  sub_category: String,   //子分类
  time: String,           //发布时间
  title: String,          //标题
  pageView: Number,       //点击量
  like: Number,           //点赞数
  banner: Boolean,        //是否为轮播图
  toppic: Boolean,        //是否为右侧置顶图片
  subject: Boolean,       //是否为主题
  content: String,        //博客内容：html字符串
  cover:String,           //博客封面
  comments:[{author:String,time:String,content:String,reply:Boolean,replyTarget:String}]
})
//轮播图
blogSchema.statics.getBanners = function(){
  return this.find({'banner':true},['cover','title']);
}
//博客
blogSchema.statics.getBlogs = function(page = 1,limit = 3,category,sub_catgory){
    if(category == 'all')
      return this.find({},['abstract','category','cover','like','time','title','pageView']).skip((page-1)*limit).limit(limit);
    else if(sub_catgory == '')
      return this.find({'category':category},['abstract','category','cover','like','time','title','pageView']).skip((page-1)*limit).limit(limit);
    else
      return this.find({'category':category,'sub_category':sub_catgory},['abstract','category','cover','like','time','title','pageView']).skip((page-1)*limit).limit(limit);
}
//推荐博客
blogSchema.statics.getRecommends = function(){
  return this.find({},['cover','time','title']).sort({'pageView':-1}).limit(5);
}
//主题博客
blogSchema.statics.getSubjects = function(){
  return this.find({'subject':true},['cover','title']).limit(5);
}
//右侧置顶博客
blogSchema.statics.getToppics = function(){
  return this.find({'toppic':true},['cover','title']).limit(2);
}
//时间轴
blogSchema.statics.getTimeLine = function(){
  return this.find({},['time','title']);
}
/** *********** menuSchema **************/
const menuSchema = mongoose.Schema({
  name: String,
  path: String,
  category: String,
  children:[{ name: String,path: String,category: String}],
})
//菜单图
menuSchema.statics.getMenu = function(){
  return this.find({});
}

/** *********** 定义模型Model **************/
const Models = {
  Blog: mongoose.model('blog', blogSchema,'blog'),
  Menu:mongoose.model('menu',menuSchema,'menu')
}

module.exports = Models
