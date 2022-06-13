<template>
  <nav>
    <!-- 方便後續新增 -->
    <router-link 
      v-for="(iten, index) in routers" 
      :key="index" 
      :to="iten.path"
    >
      {{iten.name}}
    </router-link>
  </nav>
  <router-view class="routerView"/>
</template>

<script>
import {routes} from '@/router/index.js'
export default {
  data(){
    return {
      routers: routes
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  line-height: 1.8;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a{
    font-weight: bold;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:after{
      content: '|';
      padding: .5rem;
    }
    &:last-child:after{
      display: none;
    }
  }
}

.routerView{
  margin: 0px 30px;
  padding: 15px;
  background-color: #efefef;
}
</style>
