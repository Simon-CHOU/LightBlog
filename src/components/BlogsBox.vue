<template  >
    <div  id='blogsbox'   class="blogsbox" >
 
    <Blog v-for="(v,i) in blogs"  :key='i' :title = v.title  :_id= v._id :abstract= v.abstract  :time= v.time :category= v.category :pageView= v.pageView :like= v.like :cover= v.cover></Blog>

    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import Blog from './Blog.vue'
    
   
export default {
  	data () {
		return {
			blogs:[]
		}
	  },
	  props:['category'],
	  components:{Blog},
  	mounted :function(){
		this.updateData();
	  },
	  methods:{
		  updateData:function(){
			let _self = this;
			/* 单机测试数据 */
			let tesBlogs  = require('../assets/file/blogs.json').data
			
			/** 获取博客数据 */
			$.ajax({
				type: "GET",
				url: "/api/getBlogs",
				data:{
					category:_self.category.category,
					sub_category:_self.category.sub_category
				},
				success: (data) => {
					if( data instanceof Object)
						_self.blogs = data;
					else
						_self.blogs = tesBlogs;
				}
			});
		  }
	  },
	  watch:{
		  'category' (from,to){
			  this.updateData();
		  }
	  }	
}
</script>
<style>
</style>
