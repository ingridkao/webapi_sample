<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用Leaflet來將自行車資料渲染成地圖"
        link="https://leafletjs.com/"
      />
      <div>
        地圖概念
        <div style="border: 1px solid #555;padding: 5px;">
          leafletjs:map
          <div style="border: 1px solid #555;margin: 5px;">圖層：和photoshop LAYER概念差不多有前後層概念，在這邊僅用marker</div>
          <div style="border: 1px solid #555;margin: 5px;">底圖：tileLayer，如果不特別處理通常是最底層，如googlemap or osm map</div>
        </div>
      </div>
      <hr>
      <label for="city">欲查詢縣市</label>
      <select name="city" id="city" v-model="city" @change="fetchData">
        <option v-for="item in cityOption" :value="item" :key="item">{{item}}</option>
      </select>
      <RegresAllBike 
        :error="axioError"
        :allData="axioAllData"
      />
      <div id="mapContainer" class="mapaBox"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllBike from '@/components/RegresAllBike.vue'
import axios from 'axios'
import L from "leaflet"
import "leaflet/dist/leaflet.css"

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
      cityOption: CITY_OPTION,
      city: 'Taoyuan',
      params:{
        '$format' : 'JSON'
      },
      accesstoken: '',
      map: null,
      mapConfig: {
        zoom: 14,
        center: [25.056, 121.50],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }  
    }
  },
  components: {
    HelloWorld,
    RegresAllBike
  },
  created(){
    this.getAuthorizationHeader().then(()=>{
      this.fetchData()
    })
  },
  mounted(){
    //僅能在mounted中執行，原因是要確認容器已在HTML中被渲染出來
    this.initMap()
  },
  methods: {
    getAuthorizationHeader(){
      const AUTH_URL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
      const parameter = new URLSearchParams()
      parameter.append('grant_type', 'client_credentials')
      parameter.append('client_id', 'ingrid7613-b0b80d35-76c6-41fd')
      parameter.append('client_secret', '3808da7e-51be-4ff1-bb66-d03f61b11b96')
      return axios({
        method: "POST",
        url: AUTH_URL,
        headers: { "content-type": "application/x-www-form-urlencoded" },   
        data: parameter
      }).then((response) => {
        this.accesstoken = response.data
      }).catch((err) => {
        return err
      })
    },
    fetchData(){
      this.axioAllData = []
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
    },
    initMap(){
      //指定DIV#mapContainer為Leaglet要渲染的容器，並指定中心座標位置和zoom level
      this.map = L.map("mapContainer").setView(this.mapConfig.center, this.mapConfig.zoom)
      // 將tileLayer夾在地圖上
      L.tileLayer(this.mapConfig.url, {
        attribution: this.mapConfig.attribution
      }).addTo(this.map)
    }
  }
}
</script>

<style lang="scss" scoped>
.mapaBox{
  width: 100%;
  height: 300px;
}
</style>