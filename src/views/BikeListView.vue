<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用TDX的Open data來取得自行車資料"
        link="https://tdx.transportdata.tw/api-service/swagger/basic/2cc9b888-a592-496f-99de-9ab35b7fb70d#/Bike/BikeApi_Station"
      />
      <div>
        <ol>
          <li>必填：city參數，且要帶在API endpoint</li>
          <li>必填：$format</li>
        </ol>
        API呼叫次數限制:
        <ul>
          <li>不使用API金鑰呼叫API:則僅能透過瀏覽器呼叫API，且每個呼叫來源端IP的上限為每日50次。</li>
          <li>使用API金鑰呼叫API:每個呼叫來源端IP呼叫次數限制為50次/秒 (無每日上限)。</li>
        </ul>
      </div>
      <h6>Get bike station List</h6>
      <p>欲查詢縣市</p>
      <select name="city" id="city" v-model="city" @change="AxiosFunc">
        <option v-for="item in cityOption" :value="item" :key="item">{{item}}</option>
      </select>
      <RegresAllBike 
        :error="axioError"
        :allData="axioAllData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllBike from '@/components/RegresAllBike.vue'
import axios from 'axios'
const API_URL = 'https://tdx.transportdata.tw/api/basic/'
const CITY_OPTION = [
  "Taichung",
  "Hsinchu",
  "MiaoliCounty",
  "NewTaipei",
  "PingtungCounty",
  "KinmenCounty",
  "Taoyuan",
  "Taipei",
  "Kaohsiung",
  "Tainan",
  "Chiayi"
]
export default {
  data(){
    return {
      axioError: false,
      axioAllData: [],
      city: 'Taoyuan',
      cityOption: CITY_OPTION,
      params:{
        //*指定來源格式
        '$format' : 'JSON'
      },
      accesstoken: ''
    }
  },
  components: {
    HelloWorld,
    RegresAllBike
  },
  mounted(){
    this.getAuthorizationHeader().then(()=>{
      this.AxiosFunc()
    })
  },
  methods: {
    getAuthorizationHeader(){
      //https://github.com/tdxmotc/SampleCode
      //方法一：用URLSearchParams
      const AUTH_URL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
      const parameter = new URLSearchParams()
      parameter.append('grant_type', 'client_credentials')
      parameter.append('client_id', 'ingrid7613-b0b80d35-76c6-41fd')
      parameter.append('client_secret', '3808da7e-51be-4ff1-bb66-d03f61b11b96')
      //方法二：用qs，需要安裝qs函式庫

      return axios({
        method: "POST",
        url: AUTH_URL,
        headers: { "content-type": "application/x-www-form-urlencoded" },   
        data: parameter
      }).then((response) => {
        //把response.data 丟給 Line69，再透過70行return到55行
        this.accesstoken = response.data
      }).catch((err) => {
        return err
      })
    },
    AxiosFunc(){
      this.axioAllData = []
      //取得指定[縣市]的公共自行車租借站位資料
      axios.get(`${API_URL}v2/Bike/Station/${this.city}`, {
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