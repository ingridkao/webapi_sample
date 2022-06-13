<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用Reqres來試試看Get target user"
        link="https://reqres.in/"
      />
      <h6>Get all user: response是陣列[]</h6>
      <p>一般來說search應該要用這一個API來做，但是API沒有提供search功能，所以用target user來示意</p>
      <RegresAllUser 
        :XMLHttpError="axioError"
        :userAllData="axioAllData"
      />
      <hr>
      <h6>Get traget user: response是物件{}</h6>
      <label for="search">Search ID</label>
      <input type="text" id="search" v-model="search" @keyup="AxiosTargetFunc">
      <RegresTargetUser 
        :error="axioTargetError"
        :targetData="axioTargetData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllUser from '@/components/RegresAllUser.vue'
import RegresTargetUser from '@/components/RegresTargetUser.vue'
import axios from 'axios'
const API_URL = 'https://reqres.in/api/users'
export default {
  data(){
    return {
      axioError: false,
      axioAllData: [],
      axioTargetError: false,
      axioTargetData: {},
      search: '',
      params:{
        page: 2
      }
    }
  },
  components: {
    HelloWorld,
    RegresAllUser,
    RegresTargetUser
  },
  mounted(){
    this.AxiosFunc()
    this.AxiosTargetFunc()
  },
  methods: {
    AxiosFunc(){
      //將qurey string｜參數帶進去的方式：
      //1. 直接待在網址
      // axios.get('https://reqres.in/api/users?page=1').then((response) => {
      //2. 待在config中，方便控制
      axios.get(API_URL, {
        params: this.params
      }).then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data.data
      }).catch((err) => {
        this.axioError = true
      })
    },
    AxiosTargetFunc(){
      //增加判斷
      this.axioTargetData = {}
      if(this.search === "")return
      axios.get(`${API_URL}/${this.search}`).then((response) => {
        this.axioTargetError = (response.status !== 200)
        this.axioTargetData = response.data.data
      }).catch((err) => {
        this.axioTargetError = true
      })
    }
  }
}
</script>