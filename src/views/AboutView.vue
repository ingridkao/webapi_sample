<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用Reqres來試試看Get user"
        link="https://reqres.in/"
      />
      <h6>
        1. XMLHttpRequest: JavaScript的原生物件，不需引入任何函式庫
      </h6>
      <RegresAllUser 
        :XMLHttpError="XMLHttpError"
        :userAllData="userAllData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllUser from '@/components/RegresAllUser.vue'

export default {
  data(){
    return {
      XMLHttpError: false,
      userAllData: []
    }
  },
  components: {
    HelloWorld,
    RegresAllUser
  },
  created(){
    // created -> el掛載完成，整個view已被渲染完成 -> mounted
    // 當網速慢或是專案目錄過大的時候，放在created或mounted會有差異
  },
  mounted(){
    this.XMLHttpRequestFunc()
  },
  methods: {
    XMLHttpRequestFunc(){
      const xhr = new XMLHttpRequest()

      // 初始化一個請求: (method, url, 同步｜非同步）
      xhr.open('GET', 'https://reqres.in/api/users', true)
      xhr.send()

      // 要用"箭頭函式"，用下面的寫法作用域裡面的this不是Vue
      // xhr.onload = function(){}
      xhr.onload = () => { 
        const useData = JSON.parse(xhr.response)
        // console.log(useData);
        this.userAllData = useData.data
      }
      xhr.onerror = function (err) {
        this.XMLHttpError = true
        // console.log('錯誤:', err)
      }
    }
  }
}
</script>