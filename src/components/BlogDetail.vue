<template>

<article style="position: relative;">
    <h1 class="t_nav">
        <span>您现在的位置是：<a href="/more/">首页 &nbsp;</a>&nbsp;&gt;&nbsp; &nbsp;<a href="/more/show/">{{detail.category_name}}</a> &nbsp;&gt;&nbsp;<a href="/more/show/"> &nbsp;{{detail.sub_category_name}}</a></span>
        <a href="/more/" class="n1">网站首页</a>
        <a href="/more/show/" class="n2">{{detail.category_name}}</a>
        </h1>
   <main>
    <div  id='infosbox'   class="infosbox">
        <div id="newsview" class="newsview">
            <h3 class="news_title">{{detail.title}}</h3>
            <div class="bloginfo"> 
                <ul>
                    <li class="author">{{detail.author}}</li>
                    <li class="lmname">{{detail.sub_category_name}}</li>
                    <li class="timer">{{detail.time}}</li>
                    <li class="view">{{detail.pageView}}</li>
                    <li class="like">{{detail.like}}</li>
                </ul>
            </div>
            <div class="tags" >{{detail.tags}}'tags'</div> 
            <div class="news_about"><strong>简介</strong>{{detail.abstract}}</div>
            <dl class="news_con" v-html='detail.content'>{{detail.content}}</dl>
        </div>
        
        <br><br><br>
        <p class="doLike"><button id="doLike" class="icobutton icobutton--heart" ><span  class="fa fa-heart"></span><span class="icobutton__text icobutton__text--side">{{detail.like}}</span></button></p>
         
        <Blogcomment v-for="(v,i) in detail.comments" 
            :key = i  
            :blogId = $route.query.blogId
            :commentId = v._id
            :author= v.author 
            :time = v.time 
            :content = v.content  
            :comments= v.comments 
            :reply-status= replyStatus
            :replyId = replyId
        ></Blogcomment>

        <div class="comment_form">
            <form action="index.html" @submit.prevent="comment" class="contact">
                <p v-if="form.errors.length">
                    <b>Please correct the following error(s):</b><br/>
                    <ul><li v-for="(err,i) in form.errors" :key = i>{{ err }}</li></ul>
                </p>
                <br>

                <p class="contact-input" v-if="commentStatus">
                    <input v-model="form.name" placeholder="Your Name…" >
                </p>
                <br>
                
                <p class="contact-input" v-if="commentStatus">
                    <textarea  v-model="form.content" placeholder="Your Message…"></textarea>
                </p>
                <br>
                
                <button class="comment_button" type="submit">评论</button>
            </form>
        </div>
        
        
        
    </div>
    </main>
   <Aside></Aside> 
</article>
</template>



<script type="text/javascript">
    import Vue from 'vue';
    import Blogcomment from './comment.vue'
    import Aside from "./Aside.vue"
  export default {
    data() {
        return {
               detail:{
                author:'mx',
                    abstract:'ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的矢量图形库 ZRender，提供直观，交互丰富，可高度个性化...',
                    category_name: "数据可视化",
                    sub_category_name: "ECharts",
                    tags:"tags",
                    time: "2018-5-13",
                    title: "ECharts",
                    pageView: 6,
                    like: 21,
                    content:"<h1>我就是文章内容了， 随便看看</h1>  <strong>dsfmoifdgghfndkflg</strong>" ,
                    comments:[
                        {_id:5,author:"张三",time:"2018-5-13",content:"说的好",comments:[{author:"李四",time:"2018-5-13",content:"楼上傻逼"},{author:"王五",time:"2018-5-13",content:"楼上说的对"}]},
                        {_id:6,author:"哎哟",time:"2018-5-13",content:"说的好",comments:[{author:"哎哟哟",time:"2018-5-13",content:"楼上傻逼"},{author:"哎哟哟哟",time:"2018-5-13",content:"楼上说的对"}]}
                    ]
               },
               form:{
                    name:"",
                    content:"",
                    errors:[]
                },
               commentStatus:false,
               replyStatus:false,
               replyId:""
        }
    },
    created:function(){
        this.initScroll();
        this.initData();
        this.addPageView();
        
        //this.initComment();
    },
    mounted:function(){
        this.$router.app.$on('changeReply', (msg) => { this.changeReply(msg); })
        this.$router.app.$on('updateComment', () => {  this.initComment(); })
        this.initDoLike();
    },
    components:{Blogcomment,Aside,},
    methods:{
        initScroll:function() {
            window.scrollTo(0,0);
        },
        initData:function() {
            let _self = this
            /** 获取博客数据 */
			$.ajax({
				type: "GET",
				url: "/api/getBlog",
				data:{
					blogId:this.$route.query.blogId
				},
				success: (data) => {
					if( data instanceof Object)
                        _self.detail = data[0];
				}
			});

        },
        initComment:function(){
            let _self = this
            /** 获取博客数据 */
			$.ajax({
				type: "GET",
				url: "/api/getComment",
				data:{
					blogId:this.$route.query.blogId
				},
				success: (data) => {
					if( data instanceof Object)
                        _self.detail.comments = data[0].comments;
				}
			});
        },

        initDoLike:function(){
            var clickHandler =  'click';
            function extend( a, b ) {
                for( var key in b ) { 
                    if( b.hasOwnProperty( key ) ) {
                        a[key] = b[key];
                    }
                }
                return a;
            }

            function Animocon(el, options) {
                this.el = el;
                this.options = extend( {}, this.options );
                extend( this.options, options );

                this.checked = false;

                this.timeline = new mojs.Timeline();
                
                for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
                    this.timeline.add(this.options.tweens[i]);
                }

                var self = this;
                this.el.addEventListener(clickHandler, function() {
                    if( self.checked ) {
                        self.options.onUnCheck();
                    }
                    else {
                        self.options.onCheck();
                        self.timeline.start();
                    }
                    self.checked = !self.checked;
                });
            }

            Animocon.prototype.options = {
                tweens : [
                    new mojs.Burst({
                        shape : 'circle',
                        isRunLess: true
                    })
                ],
                onCheck : function() { return false; },
                onUnCheck : function() { return false; }
            };


            let _self = this;
            var el14 = document.getElementById('doLike');
                new Animocon(el14, {
                    tweens : [
                        // ring animation
                        new mojs.Transit({
                            parent: el14,
                            duration: 750,
                            type: 'circle',
                            radius: {0: 40},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {35:0},
                            opacity: 0.2,
                            x: '50%',     
                            y: '45%',
                            isRunLess: true,
                            easing: mojs.easing.bezier(0, 1, 0.5, 1)
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 500,
                            delay: 100,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.2,
                            x: '50%', 
                            y: '50%',
                            shiftX : 40, 
                            shiftY : -60,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 500,
                            delay: 180,
                            type: 'circle',
                            radius: {0: 10},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.5,
                            x: '50%', 
                            y: '50%',
                            shiftX : -10, 
                            shiftY : -80,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 800,
                            delay: 240,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.3,
                            x: '50%', 
                            y: '50%',
                            shiftX : -70, 
                            shiftY : -10,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 800,
                            delay: 240,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.4,
                            x: '50%', 
                            y: '50%',
                            shiftX : 80, 
                            shiftY : -50,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 1000,
                            delay: 300,
                            type: 'circle',
                            radius: {0: 15},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.2,
                            x: '50%', 
                            y: '50%',
                            shiftX : 20, 
                            shiftY : -100,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Transit({
                            parent: el14,
                            duration: 600,
                            delay: 330,
                            type: 'circle',
                            radius: {0: 25},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.4,
                            x: '50%', 
                            y: '50%',
                            shiftX : -40, 
                            shiftY : -90,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        // icon scale animation
                        
                    ],
                    onCheck : function() {
                        el14.style.color = '#F35186';
                        _self.updateLike(1);
                    },
                    onUnCheck : function() {
                        el14.style.color = '#C0C1C3';
                        _self.updateLike(-1)
                        
                    }
                });
        },
        addPageView:function(){
            let _self = this
            /** 获取博客数据 */
			$.ajax({
				type: "POST",
				url: "/api/addPageView",
				data:{
					blogId:this.$route.query.blogId
				},
				success: (data) => {
                    console.log(data);
				}
			});
        },
        updateLike:function(num){
           /** 获取博客数据 */
           let _self = this;
			$.ajax({
				type: "POST",
				url: "/api/updateLike",
				data:{
                    blogId:this.$route.query.blogId,
                    num:num
				},
				success: (data) => {
                    _self.detail.like+=num;
				}
			});
            
        },
        comment:function(formData){
            if(!this.commentStatus){
                this.commentStatus = true;
                return;
            }

            this.form.errors = [];

            if (!this.form.name) 
                this.form.errors.push('Name required.');
            
            if (!this.form.content) 
                this.form.errors.push('Content required.');
            
            if(this.form.errors.length>0)
                return;

            /** 添加评论 */
			$.ajax({
				type: "POST",
				url: "/api/addComment",
				data:{
					blogId:this.$route.query.blogId,
                    name:this.form.name,
                    content:this.form.content
				},
				success: (data) => {
					console.log(data);
				}
			});

            this.form = {name:"",content:"",errors:[]}
            this.commentStatus = false;
            this.initComment();
        },
        changeReply:function(msg){
            console.log(msg);
            this.replyStatus = msg.turn;
            this.replyId = msg.commentId;
        }
    }
  }

</script>

<style scoped>

 
.comment_button { /* 按钮美化 */
	width: 20%; /* 宽度 */
	height: 40px; /* 高度 */
	border-width: 0px; /* 边框宽度 */
	border-radius: 3px; /* 边框半径 */
	display: block;
	margin:0 auto;
	background: #009a61; /* 背景颜色 */
	cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
	outline: none; /* 不显示轮廓线 */
	font-family: Microsoft YaHei; /* 设置字体 */
	color: white; /* 字体颜色 */
	font-size: 17px; /* 字体大小 */
}
.comment_button:hover { /* 鼠标移入按钮范围时改变颜色 */
	background: #03ce84;
}

.comment_form{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.comment_form p{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.contact{
    width: 100%
}



.doLike {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}



/* Icons button */
.icobutton {
	font-size: 3em;
	position: relative;
	margin: 0 auto;
	padding: 0;
	color: #c0c1c3;
	border: 0;
	background: none;
	overflow: visible;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

.icobutton .fa {
	display: block;
	padding: 0 0.1em;
}

.icobutton__text {
	font-size: 0.75em;
	position: absolute;
	top: 100%;
	left: -50%;
	width: 200%;
	text-align: center;
	line-height: 1.5;
	color: #a6a6a6;
}

.icobutton__text--side {
	top: 0;
	left: 100%;
	width: 100%;
	width: auto;
	padding: 0 0 0 0.25em;
}

/* fix for mo.js */
.icobutton svg {
	left: 0;
}

.icobutton:hover,
.icobutton:focus {
	outline: none;
}

/* Unicorn */
.icobutton--unicorn svg {
	fill: #c0c1c3;
}

</style>
