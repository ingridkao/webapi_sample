<template>
  <HelloWorld 
    msg="參考codepan範例，實作出氣象地圖"
    link="https://codepen.io/caocharles/pen/oNYZZEo"
  />
  
  <div id="taiwanMapBox">
    <div class="title_area">
      <h1>Taiwan<span>///</span><br>Weather Map<br></h1>
      <div class="forecast" v-if="targetLocation">
        {{targetLocation}}
        <!-- <h5>{{now_area.place}}</h5>
        <h4>{{now_area.low}} ~ {{now_area.high}}</h4>
        <h2>{{now_area.weather}}</h2> -->
      </div>
    </div>
    <TaiwanWeather @trigger="updateTargetLocation"/>
  </div>
  <!-- <Weather 
    :error="axioError"
    :allData="axioAllData"
  /> -->
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Weather from '@/components/Weather.vue'
import TaiwanWeather from '@/components/TaiwanWeather.vue'
import axios from 'axios'
//※ URL：https://opendata.cwb.gov.tw/api/v1/rest/datastore/{dataid}?Authorization={apikey}&format={format}
const API_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/'
export default {
  data(){
    return {
      axioError: false,
      axioAllData: [],
      params:{
        'Authorization': 'CWB-DBEF296D-42A4-4C58-8CC7-4D51E3C1E878',
        // 'locationName': ['宜蘭縣'],
        'elementName': ['Wx','MaxT','MinT','PoP']
      },
      targetLocation: ""
    }
  },
  components: {
    HelloWorld,
    Weather,
    TaiwanWeather
  },
  mounted(){
    this.AxiosFunc()
  },
  methods: {
    AxiosFunc(){
      //https://opendata.cwb.gov.tw/opendatadoc/MFC/ForecastElement.pdf
      //elementName可以篩選
      //官網上說是array[string]，但測試後發現他是以逗號隔開
      axios.get(`${API_URL}F-C0032-001`, {
        params: {
          ...this.params,
          // 'locationName': this.params.locationName.toString(),
          'elementName': this.params.elementName.toString()
        }
      }).then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data.records.location
      }).catch((err) => {
        this.axioError = true
      })
    },
    updateTargetLocation(target){
      this.targetLocation = target
    }
  }
}
</script>

<style lang="scss">
$mainColor: #fff;
$minorColor: #B99362;
$bgColor: #222;

#taiwanMapBox{
  display: flex;
  font-family: "Source Code Pro";
  letter-spacing: 4px;
  width: 100vh;
  height: calc(100vh - 10rem);
  padding: 1rem;
  color: $mainColor;
  background-color: $bgColor;
  .title_area{
    position: relative;
    color: $mainColor;
    h1{
      span {
          color: $minorColor;
      }
    }
  }
  svg {
    width: 100%;
    height: 100%;
    path {
      height: 100vh;
      fill: transparent;
      stroke: $mainColor;
      transition: 0.5s;
      cursor: pointer;
      &:hover {
        fill: $minorColor;
        transform: translate(-5px, -5px);
      }
    }
  }
}
</style>