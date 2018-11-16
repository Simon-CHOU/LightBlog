<template>
    <article>
        <main>
            <Banner></Banner>
            <div class="blank"></div>
            <BlogsBox :category =category></BlogsBox>
        </main>
       <Aside use-toppic="true" ></Aside> 
    </article>
</template>
<script type="text/javascript">
import BlogsBox from "./BlogsBox.vue";
import Banner from "./Banner.vue";
import Aside from "./Aside.vue"

export default {
  data() {
    return {
        category:{
            category:'all',
            sub_category:''
        }
    }
  },
  components: { BlogsBox, Banner ,Aside},
  mounted:function(){
		this.changeMenu();
	},
  methods:{
		changeMenu:function(menu){
			this.$router.app.$emit('changemenu','index')
		}
	}
};
</script>
<style>
</style>
