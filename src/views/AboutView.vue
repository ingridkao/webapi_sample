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
      <h6>2. Fetch API: 使用ES6的Promise物件做回傳的處理，不需引入任何函式庫</h6>
      <ul>
        <li>可以搭配 async/await</li>
        <li>缺點：舊瀏覽器如IE不支援</li>
      </ul>
      <RegresAllUser 
        :XMLHttpError="fetchError"
        :userAllData="fetchAllData"
      />
      <h6>3. Axios: 引入函式庫</h6>
      <RegresAllUser 
        :XMLHttpError="axioError"
        :userAllData="axioAllData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllUser from '@/components/RegresAllUser.vue'
import axios from 'axios'
export default {
  data(){
    return {
      XMLHttpError: false,
      userAllData: [],
      fetchError: false,
      fetchAllData: [],
      axioError: false,
      axioAllData: []
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
    // this.XMLHttpRequestFunc()
    // this.FetchAPIFunc()
    this.AxiosFunc()
  },
  methods: {
    XMLHttpRequestFunc(){
      const xhr = new XMLHttpRequest()
      // 請求: (method, url,                          同步｜非同步）
      xhr.open('GET', 'https://reqres.in/api/users', true)
      xhr.send()

      // 錯誤寫法:function作用域裡面的this不是Vue
      // xhr.onload = function(){}
      xhr.onload = () => { 
        const useData = JSON.parse(xhr.response)
        this.userAllData = useData.data
      }
      xhr.onerror = (err) => {
        this.XMLHttpError = true
      }
    },
    FetchAPIFunc(){
      fetch('https://reqres.in/api/users').then((response) => {
        this.fetchError = (response.status !== 200)
        //json(): 返回 Promise，resolves 是 JSON 物件
        return response.json()
      }).then(responseText => {
        const useData = responseText
        this.fetchAllData = useData.data
      }).catch((err) => {
        this.fetchError = true
      })
    },
    AxiosFunc(){
      axios.get('https://reqres.in/api/users').then((response) => {
        console.log(response.data);
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data.data
      }).catch((err) => {
        this.axioError = true
      })
    } 
  }
}
</script>