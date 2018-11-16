<template>
    <div>
        <div class="pagebg">
            <img src="http://www.yangqq.com/more/d/file/p/2018/08-05/585a09b39a7ff839cbc62338d3d89521.jpg" alt="学无止境" >
        </div>
        <div class="container">
            <h1 class="t_nav">
				<span >不要轻易放弃。学习成长的路上，我们长路漫漫，只因学无止境。</span>
				<a href="/more/" class="n1">首页</a>
				<a href="/more/study/" class="n2" >{{this.$route.query.name }}</a>
			</h1>
            <main>
                <BlogsBox :category = category></BlogsBox>
            </main>
            <Aside  ></Aside> 
       </div>
    </div>
</template>
<script type="text/javascript">
import BlogsBox from "./BlogsBox.vue";
import Aside from "./Aside.vue"

export default {
	data() {
		return {
			category:{}
		}
	},
	components: { BlogsBox ,Aside},
	mounted:function(){
		this.changeMenu();
		this.updateCategory();
	},
	watch: {
		'$route.query' (to, from) {
			this.changeMenu();
			this.updateCategory();
		}
	},
	methods:{
		changeMenu:function(){
			this.$router.app.$emit('changemenu',this.$route.query.menu)
		},
		updateCategory:function(){
			this.category = {
				category:this.$route.query.category,
				sub_category:this.$route.query.sub_category
			}
		}
	}
	
};
</script>
<style>
</style>
