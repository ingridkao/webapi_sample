<template>
  <HelloWorld 
    msg="參考codepan範例，實作出氣象地圖"
    link="https://codepen.io/caocharles/pen/oNYZZEo"
  />
  <HelloWorld 
    msg="天氣描述代碼表"
    link="https://opendata.cwb.gov.tw/opendatadoc/MFC/ForecastElement.pdf"
  />
  <div id="taiwanMapBox">
    <div class="title_area">
      <h1>
        Taiwan<span>///</span><br>
        Weather Map<br>
      </h1>
      <div v-if="targetCity" id="forecast">
        <h5>{{targetCity}}</h5>
        <div class="periodBox">
          <div v-for="hour in 3" :key="hour">
            近{{hour*12}}小時
          </div>
        </div>
        <div 
          v-for="(weather, index) in targetWeather" 
          :key="index"
          class="weatherBox"
        >
          <div 
            v-for="(item, index2) in weather.time" 
            :key="index2"
            :class="weather.elementName"
            v-html="translateWeather(weather.elementName, item.parameter)"
          />
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
    },
    translateWeather(type, parameter){
      const {parameterName, parameterValue, parameterUnit} = parameter
      if(type === 'Wx'){
        return `<div class="code${parameterValue}"></div>${parameterName}`
      }else{
        let Unit = (parameterUnit === '百分比')? '%': '°C'
        return `${parameterName}${Unit}`
      }
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
    width: 23rem;
    flex: 1 0 23rem;
    h1{
      span {
          color: $minorColor;
      }
    }
  }
  svg {
    flex: 1 1 auto;
    path {
      stroke: $mainColor;
      &:hover {
        fill: $minorColor;
      }
    }
    g.active path{
      fill: $minorColor;
    }
  }
  #WeatherContainer{
    width: 60rem;
    flex: 1 1 60rem;

    max-height: calc(100vh - 10rem);
    overflow: scroll;
  }
}
#forecast{
  width: 100%;
  >div{
    display: inline-flex;
    width: 100%;
    >div{
      flex: 1 1 7rem;
    }
  }
  .periodBox{
    font-size: .5rem;
  }
  .weatherBox{
    >div{
      &.Wx > div{
        font-size: 3rem;
        text-align: center;
        &.code1:before{
          content: '☀️';
        }
        &.code2:before{
          content: '🌤️';
        }
        &.code3:before,
        &.code4:before,
        &.code5:before,
        &.code6:before,
        &.code7:before{
          content: '☁️';
        }
        &.code8:before,
        &.code9:before,
        &.code10:before,
        &.code11:before,
        &.code12:before,
        &.code13:before,
        &.code14:before{
          content: '🌧';
        }
        &.code15:before,
        &.code16:before,
        &.code17:before,
        &.code18:before,
        &.code22:before{
          content: '⛈️';
        }
        &.code19:before,
        &.code20:before,
        &.code21:before{
          content: '🌦';
        }
        &.code23:before{
          content: '🌨';
        }
        &.code24:before,
        &.code25:before,
        &.code26:before,
        &.code27:before{
          content: '🌫';
        }

      }
      &.PoP{
        padding-left: .5rem;
        &:before{
          content: '💧';
        }
      }
      &.MinT{
        padding-left: .5rem;
        &:before{
          content: '🌡';
        }
      }
      &.MaxT{
        padding-left: 2rem;
        &:before{
          content: '↘';
        }
      }
    }
  }
}
</style>