<template>
  <div class="blogs">
    <h3 class="blogtitle"><a href="/more/show/19.html" target="_blank">{{title}}</a></h3>
    <span class="blogpic">
      <a href="/more/show/19.html" title="作为一个设计师,如果遭到质疑你是否能恪守自己的原则">
        <img :src="cover" alt="图片加载失败">
      </a>
    </span>

    <p class="blogtext">{{abstract}}</p>
    <div class="bloginfo">
      <ul>
        <li class="author"></li>
        <li class="lmname"><a href="/more/show/" target="_blank">{{category}}</a></li>
        <li class="timer">{{time}}</li>
        <li class="view"><span>{{pageView}} </span>已阅读</li>
        <li class="like">{{like}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import scrollReveal from "scrollreveal";

  export default {
    data() {
      return {
        scrollReveal: scrollReveal()
      }
    },
    props: ["title", "abstract", "category", "time", "pageView", "like", "cover"],

    mounted: function () {
      //console.log(this.scrollReveal);
      this.scrollReveal.reveal('.blogs', {
        // 动画的时长
        duration: 700,
        // 延迟时间
        delay: 0,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: 'bottom',
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: false,
        // 滚动的距离，单位可以用%，rem等
        distance: '0px',
        // 其他可用的动画效果
        opacity: 0.001,
        easing: 'linear',
        scale: 0.6,
      })
    }
  }

</script>
<style>
</style>
