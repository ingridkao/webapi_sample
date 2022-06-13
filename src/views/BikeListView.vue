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
export default {
  data(){
    return {
      axioError: false,
      axioAllData: [],
      city: 'Taoyuan',
      params:{
        //*指定來源格式
        '$format' : 'JSON',
        //取前幾筆
        // '$top': 100
      },
      total_pages: 0
    }
  },
  components: {
    HelloWorld,
    RegresAllBike
  },
  mounted(){
    this.AxiosFunc()
  },
  methods: {
    AxiosFunc(){
      this.axioAllData = []
      //取得指定[縣市]的公共自行車租借站位資料
      axios.get(`${API_URL}v2/Bike/Station/${this.city}`, {
        params: this.params
      }).then((response) => {
        this.axioError = (response.status !== 200)
        // this.total_pages = response.data.total_pages
        this.axioAllData = response.data
      }).catch((err) => {
        this.axioError = true
      })
    },
    selectPage(page){
      this.AxiosFunc()
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