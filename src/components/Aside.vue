<template>
    <div class="sidebar">
        <div class="toppic" v-if="useToppic" >
            <li v-for="(v,i) in toppics"  :key='i'>
                <a href="/more/life/3.html" title="安静地做一个爱设计的女子" target="_blank">
                    <i><img :src="v.cover"></i>
                    <h2>{{v.title}}</h2> 
                </a> 
            </li>
        </div>

        <div class="subject">
            <h2 class="hometitle">专题</h2>
            <ul>
                <li v-for="(v,i) in subjects"  :key='i' > 
                    <i><img :src='v.cover'></i>
                    <p>{{v.title}}<span>
                        <a href="/more/life/8.html" title="作为一个设计师,如果遭到质疑你是否能恪守自己的原则?" target="_blank">阅读</a></span> </p>
                </li>       
            </ul>   
        </div>

        <div class="recommend" >
            <h2 class="hometitle">特别推荐</h2>
            <ul class="tjpic"  v-for="(v,i) in recommends"  :key='i' v-if='i==0' >
                <i><img :src='v.cover'></i>
                <p><a href="/more/show/19.html" title="作为一个设计师,如果遭到质疑你是否能恪守自己的原则" target="_blank">{{v.title}}</a></p>
            </ul>
            <ul class="sidenews">
                <li v-for="(v,i) in recommends"  :key='i' v-if='i>0' > 
                    <i><img :src="v.cover"></i>
                    <p><a href="/more/study/1/1.html" title="个人博客，属于我的小世界！" target="_blank">{{v.title}}</a></p>
                    <span>{{v.time}}</span>
                </li>
            </ul>
        </div>

             <div class="attention">
    <h2 class="hometitle">关注我们 么么哒！</h2>
    <ul>
      <li class="sina"><a href="/" target="_blank"><span>新浪微博</span>杨青博客</a></li>
      <li class="tencent"><a href="/" target="_blank"><span>腾讯微博</span>杨青博客</a></li>
      <li class="qq"><a href="/" target="_blank"><span>QQ号</span>476847113</a></li>
      <li class="email"><a href="/" target="_blank"><span>邮箱帐号</span>dancesmiling@qq.com</a></li>
      <li class="wxgzh"><a href="/" target="_blank"><span>微信号</span>yangqq_1987</a></li>
      <li class="wx"><img src="../assets/images/wx.jpg"></li>
    </ul>
  </div>
    </div>
</template> 

<script type="text/javascript">

export default {
	data() {
		return {
			recommends:[],
			subjects:[],
			toppics:[]
		};
  	},
	mounted :function(){
		let _self = this;
		
		/* 单机测试数据 */
		let testToppics = require('../assets/file/toppics.json').data
		let testRecommends  = require('../assets/file/recommend.json').data

		let testSubjects = require('../assets/file/subject.json').data
		
		/** 获取顶部博客数据 */
		$.ajax({
			type: "GET",
			url: "/api/getToppics",
			success: (data) => {
				if( data instanceof Object)
					_self.toppics = data;
				else
					_self.toppics = testToppics
			}
		});

		/** 获取推荐列表数据 */
		$.ajax({
			type: "GET",
			url: "/api/getRecommends",
			success: (data) => {
				if( data instanceof Object)
					_self.recommends = data;
				else
					_self.recommends = testRecommends
			}
		});

		//获取专题数据
		$.ajax({
			type: "GET",
			url: "/api/getSubjects",
			success: (data) => {
				if( data instanceof Object)
					_self.subjects = data;
				else
					_self.subjects = testSubjects
			}
		});

	  },
	  props:['useToppic']
};
</script>

<style>
</style>
