<template >
  <div id="header" class="header-navigation" >
    <nav>
      <div class="logo"><a href="/more/">轻博客</a></div>
      <h2 id="mnavh"><span class="navicon"></span></h2>
      <ul id="starlist">
        <li>
            <router-link :to="{path:'index',query: {}}"  :class="selectedMenu=='index'?'selected':'unselected'">首页</router-link>
          
        </li>

        
      <li v-for="(v,i) in menu" :key='i' :class="v.children==null?'':'menu'">
          <router-link :to="{path:v.path,query: {menu:v.name,name:v.name,category:v.category,sub_category:null}}" :class="selectedMenu==v.name?'selected':'unselected'" v-if="v.category">
              {{v.name}}
          </router-link>
          <router-link :to="{path:v.path,query: {menu:v.name,name:v.name}}" :class="selectedMenu==v.name?'selected':'unselected'" v-else>
              {{v.name}}
          </router-link>
          <ul class="sub">
            <li v-for="(c,j) in v.children" :key='j' >
              <router-link :to="{path:c.path,query: {menu:v.name,name:c.name,category:v.category,sub_category:c.category}}" >{{c.name}}</router-link>
            </li>
          </ul>
        </li>


      </ul>
      <div class="searchbox">
        <div id="search_bar" class="search_bar">
          <form id="searchform" action="/more/e/search/index.php" method="post" name="searchform">
            <input class="input" placeholder="想搜点什么呢.." type="text" name="keyboard" id="keyboard">
            <input type="hidden" name="show" value="title">
            <input type="hidden" name="tempid" value="1">
            <input type="hidden" name="tbname" value="news">
            <input type="hidden" name="Submit" value="搜索">
            <p class="search_ico"> <span></span></p>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu:[]
    };
  },
  props:['selectedMenu'],
  methods: {
    initCSS: function() {
      var oH2 = document.getElementById("mnavh");
      var oUl = document.getElementById("starlist");
      oH2.onclick = function() {
        var style = oUl.style;
        style.display = style.display == "block" ? "none" : "block";
        oH2.className = style.display == "block" ? "open" : "";
      };

      var obj = null;
      var As = document.getElementById("starlist").getElementsByTagName("a");
      obj = As[0];
      for (let i = 1; i < As.length; i++) {
        if (window.location.href.indexOf(As[i].href) >= 0) obj = As[i];
      }
      obj.id = "selected";

      $("#starlist>li:nth-child(2)").addClass("menu");

      //header
      var new_scroll_position = 0;
      var last_scroll_position;
      var header = document.getElementById("header");

      window.addEventListener("scroll", function(e) {
        last_scroll_position = window.scrollY;

        if (
          new_scroll_position < last_scroll_position &&
          last_scroll_position > 80
        ) {
          header.classList.remove("slideDown");
          header.classList.add("slideUp");
        } else if (new_scroll_position > last_scroll_position) {
          header.classList.remove("slideUp");
          header.classList.add("slideDown");
        }

        new_scroll_position = last_scroll_position;
      });

      //search
      $(".search_ico").click(function() {
        $(".search_bar").toggleClass("search_open");
        if ($("#keyboard").val().length > 2) {
          $("#keyboard").val("");
          $("#searchform").submit();
        } else {
          return false;
        }
      });
    },
    initMenu: function() {
      let _self = this;
      let testMenu = require('../assets/file/menu.json').data


      /** 获取菜单数据 */
      $.ajax({
        type: "GET",
        url: "/api/getMenu",
        success: (data) => {
          if( data instanceof Object)
            _self.menu = data;
          else
            _self.menu = testMenu
        }
      });

    }
  },
  updated() {
    this.initCSS();
  },
  mounted() {
    this.initMenu();
  }
};
</script>

<style>
</style>
