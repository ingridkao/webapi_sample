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
    </div>
    <div class="bikeContainer">
      <div class="listBox" :class="{loadBox: load}">
        <label for="city">欲查詢縣市</label>
        <select name="city" id="city" v-model="city" @change="updateData">
          <option v-for="item in cityOption" :value="item" :key="item">{{item}}</option>
        </select>
        <div v-if="load" class="verticalMiddle">Loading</div>
        <RegresAllBike 
          v-else
          :error="axioError"
          :allData="axioAllData"
          @trigger="pantoTrigger"
        />
      </div>
      <div id="mapContainer" class="mapBox"></div>
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
const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
export default {
  data(){
    return {
      load: false,
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
        center: [25.056, 121.50],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      marker: null
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
  onBeforeUnmount() {
    //讓效能更好，離開此頁面Leaflet移除
    if (this.map) this.map.remove()
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
      this.load = true
      this.axioAllData = []
      axios.get(`${API_URL}v2/Bike/Station/${this.city}`, {
        headers: {
          authorization: `Bearer ${this.accesstoken.access_token}`,
        },
        params: this.params
      }).then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data

        //Get Data positoin
        this.updateMapCenter()
        this.updateMapMarker()

      }).catch((err) => {
        this.axioError = true
      }).finally(()=>{
        this.load = false
      })
    },
    updateData(){
      if(this.marker){
        this.map.removeLayer(this.marker)
      }
      this.fetchData()
    },
    initMap(){
      //指定DIV#mapContainer為Leaglet要渲染的容器，並指定中心座標位置和zoom level
      this.map = L.map("mapContainer").setView(this.mapConfig.center,8)
      // 將tileLayer夾在地圖上
      L.tileLayer(this.mapConfig.url, {
        attribution: this.mapConfig.attribution
      }).addTo(this.map)
    },
    updateMapCenter(){
      if(!(this.axioAllData[0] && this.axioAllData[0]['StationPosition']))return
      const {PositionLon, PositionLat} = this.axioAllData[0]['StationPosition']
      //確認有沒有經緯度
      if(!(PositionLon && PositionLat)) return
      this.mapConfig.center = [PositionLat, PositionLon]
      this.map.setView(this.mapConfig.center, 13.5)
    },
    pantoTrigger(item){
      //item有接到子層的東西嗎？
      if(!(item && item.length === 2))return
      this.mapConfig.center = item
      this.map.setView(this.mapConfig.center, 16, {animate: true, duration: 25})
    },
    updateMapMarker(){
      //如果沒有資料就不新增了
      if(this.axioAllData.length === 0)return
      this.axioAllData.map((item) => {
        const {PositionLat, PositionLon} = item.StationPosition
        this.marker = new L.marker([PositionLat, PositionLon],{ icon: blackIcon }).addTo(this.map)          .bindPopup(`
          ${item.StationName.Zh_tw}
        `)
      })
    }
  }
}
</script>

<style lang="scss">
.bikeContainer{
  display: inline-flex;
  height: calc(100vh - 20rem);
  width: 100%;
  margin: 1rem 0;
  .listBox{
    flex: 1 1 26rem;
    .dataBox {
      height: calc(100% - 2rem);
      max-height: calc(100% - 2rem);
      overflow: scroll;
    }
    &.loadBox .dataBox{
      background-color: #fff;
    }
  }
  .mapBox{
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
  }
  .verticalMiddle{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>