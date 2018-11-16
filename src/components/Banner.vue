<template>
  <div class="banner">
    <div id="banner" class="fader">
      <li class="slide">
        <a href="/more/life/2.html" title="【匆匆那些年】总结个人博客经历的这四年…" target="_blank" v-if="banners.length>0">
          <img :src="banners[0].cover">
          <span class="imginfo">{{banners[0].abstract}}</span>
        </a></li>
      <div class="fader_controls">
        <div class="page prev" data-target="prev">&lsaquo;</div>
        <div class="page next" data-target="next">&rsaquo;</div>
        <ul class="pager_list">
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        banners:[]
      }
    },
    mounted:function(){
        let _self = this;

		/* 单机测试数据 */
		let testBanners = require('../assets/file/banner.json').data

		/** 获取横幅数据 */
		$.ajax({
			type: "GET",
			url: "/api/getBanners",
			success: (data) => {
				if( data instanceof Object)
					_self.banners = data;
				else
					_self.banners = testBanners;
			}
		});
    }
  }

</script>
<style>
</style>
