<template>
  <HelloWorld 
    msg="參考codepan範例，實作出氣象地圖"
    link="https://codepen.io/caocharles/pen/oNYZZEo"
  />
  
  <div id="taiwanMapBox">
    <div class="title_area">
      <h1>
        Taiwan<span>///</span><br>
        Weather Map<br>
      </h1>
      <div v-if="targetCity" id="forecast">
        <h5>{{targetCity}}</h5>
        <div v-for="(weather, index) in targetWeather" :key="index">
          {{weather.elementName}}
          <div v-for="(item, index2) in weather.time" :key="index2">
            {{item.startTime}}-{{item.endTime}}
            {{item.parameter.parameterName}}{{item.parameter.parameterUnit}}
          </div>
        </div>
      </div>
    </div>
    <TaiwanWeather @trigger="updateTargetCity"/>

    <Weather 
      :error="axioError"
      :allData="axioAllData"
    />
  </div>
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
      targetCity: "",
      targetWeather: []
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
      this.axioAllData = []
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
    updateTargetCity(target){
      const targetLocation = this.axioAllData.find(item => {
        return item.locationName === target
      })
      this.targetCity = targetLocation? targetLocation.locationName: ''
      this.targetWeather = targetLocation? targetLocation.weatherElement: []
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
  width: 100%;
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
  #WeatherList{
    width: 60rem;
    max-height: calc(100vh - 10rem);
    overflow: scroll;
  }
}
</style>