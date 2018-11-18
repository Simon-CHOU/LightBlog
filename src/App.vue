<template>
  <div id="app">
    <Header :selectedMenu="selectedMenu"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  data(){
    return {
      selectedMenu:'index'
    }
  },
  components: {Header },
  mounted:function(){
	this.$router.app.$on('changemenu', (menu) => { this.changeMenu(menu); })
  },
  methods:{
    changeMenu:function(menu){
      this.selectedMenu=menu
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
