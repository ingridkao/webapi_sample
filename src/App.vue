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
  <router-view/>
</template>

<script>
export default {
  data(){
    return {
      routers: [
        {path: "/", name: "Home"},
        {path: "/about", name: "About"}
      ]
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

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
</style>
