<template>
  <div>
    <div>
      Async|Await寫法: 目的是為了解決一直不斷RETUR的寫法
      <div>
        <ol>
          <li>和Token API取得token</li>
          <li>將token帶進API里</li>
        </ol>
      </div>
      <h6>Get bike station List</h6>
      <RegresAllBike 
        :error="axioError"
        :allData="axioAllData"
      />
    </div>
  </div>
</template>

<script>
import RegresAllBike from '@/components/RegresAllBike.vue'
import axios from 'axios'
const API_URL = 'https://tdx.transportdata.tw/api/basic/'
export default {
  data(){
    return {
      axioError: false,
      axioAllData: [],
      city: 'Taoyuan',
      params:{
        '$format' : 'JSON'
      },
      accesstoken: ''
    }
  },
  components: {
    RegresAllBike
  },
  async mounted(){
    //在async之內的作用域
    await this.getAuthorizationHeader()
    //會等getAuthorizationHeader裡面的promise做完事情在做下一個AxiosFunc
    await this.AxiosFunc()
  },
  methods: {
    getAuthorizationHeader(){
      const AUTH_URL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
      const parameter = new URLSearchParams()
      parameter.append('grant_type', 'client_credentials')
      parameter.append('client_id', 'ingrid7613-b0b80d35-76c6-41fd')
      parameter.append('client_secret', '3808da7e-51be-4ff1-bb66-d03f61b11b96')

      //這邊要記得return
      return axios({
        method: "POST",
        url: AUTH_URL,
        headers: { "content-type": "application/x-www-form-urlencoded" },   
        data: parameter
      }).then((response) => {
        this.accesstoken = response.data
      }).catch((err) => {
        this.axioError = true
      })
    },
    AxiosFunc(){
      if(!(this.accesstoken && this.accesstoken.access_token))return
      this.axioAllData = []
      return axios.get(`${API_URL}v2/Bike/Station/${this.city}`, {
        headers: {
          authorization: `Bearer ${this.accesstoken.access_token}`,
        },
        params: this.params
      }).then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data
      }).catch((err) => {
        this.axioError = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  button{
    cursor: pointer;
    margin: 3px;
    &:hover{
      background: #ddd;
    }
    &.active{
      background: #999;
    }
  }
}
</style>