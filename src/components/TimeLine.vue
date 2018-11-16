<template>
    <div>
        <div class="pagebg">
            <img src="http://www.yangqq.com/more/d/file/p/2018/08-05/212b0df457fd9db23b6f0f846905ef6a.jpg" alt="时间轴" >
        </div>
        <div class="container">
            <h1 class="t_nav">
				<span >时光飞逝，机会就在我们眼前，何时找到了灵感，就要把握机遇，我们需要智慧和勇气去把握机会。</span>
				<a href="/more/" class="n1">首页</a>
				<a href="/more/study/" class="n2" >{{this.$route.query.name }}</a>
			</h1>
            <div class="timebox">
                <ul id="list">
                    <li class='li' v-for='(v,i) in timeline' :key=i ><span>{{v.time}}</span><a href="" target="_blank">{{v.title}}</a></li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script type="text/javascript">
import scrollReveal from "scrollreveal";
export default {
	data() {
		return {
            timeline:[]
        }
    },
	mounted:function(){
        this.changeMenu();
        this.initData();
        
	},
	watch: {
		'$route.query' (to, from) {
			this.changeMenu();
		}
	},
	methods:{
		changeMenu:function(menu){
			this.$router.app.$emit('changemenu',this.$route.query.menu)
        },
        initData:function(){
            let _self = this;
            let testTimeLine = [
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'},
                {time:'2018-07-15',title:'测试文章标题'}
            ]


            /** 获取博客数据 */
			$.ajax({
				type: "GET",
                url: "/api/getTimeLine",
                data:{category:'all'},
				success: (data) => {
					if( data instanceof Object)
						_self.timeline = data;
					else
						_self.timeline = testTimeLine;
				}
			});


        }
	}
	
};
</script>
<style>
</style>
