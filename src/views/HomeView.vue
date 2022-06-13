<template>
  <div class="home">
    <HelloWorld 
      msg="這堂課的NOTION LINK"
      link="https://fluff-budget-3b7.notion.site/WebAPI-a0cda91a360e459c951682116f42ad64"
    />
    <HelloWorld 
      msg="關於各個頁面的串接說明"
      link="https://github.com/ingridkao/webapi_sample#readme"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
