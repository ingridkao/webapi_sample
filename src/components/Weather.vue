<template>
  <div id="WeatherContainer">
    <div v-if="error">
      Error
    </div>
    <div v-else-if="allData.length === 0">
      No Data
    </div>
    <div v-else class="weatherList">
      <button 
        v-for="(time, index) in translateTimes"
        :key="index"
        class="timeBox"
      >
        <h6>近{{(index+1)*12}}小時</h6>
        {{time}}
      </button>
      <div 
        v-for="item in allData" 
        :key="item.locationName"
        class="cityBox"
      >
        <h4>{{item.locationName}}</h4>

        <div class="weatherBox">
          <div 
            v-for="(el, index) in item.weatherElement" 
            :key="index"
          >
            <p v-for="(weather, index2) in el.time" :key="index2">
              {{weather.parameter.parameterName}}{{weather.parameter.parameterUnit}}
              <!-- {{translateWeather(el.elementName, weather)}} -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    allData: Array
  },
  computed: {
    translateTimes: function(){
      if(!(this.allData.length > 0 && this.allData[0]['weatherElement']))return []
      const Data = this.allData[0]['weatherElement']
      if(!(Data && Data[0] && Data[0]['time'])) return []
      const DataTimes = Data[0]['time']
      return DataTimes.map(item => {
        const {startTime, endTime} = item
        const splitFun = (str) => {
          const Time = str.split(' ')[1]
          return Time.split(':')[0]
        }
        return `${splitFun(startTime)}-${splitFun(endTime)}`
      })
    }
  },
  methods: {
    translateWeather(type, weather){
      // console.log(weather);
      // const {parameterName, parameterValue, parameterUnit} = parameter
      // if(type === 'Wx'){

      // }else{
      //   let Unit = (parameterUnit === '百分比')? '%': '°C'
      //   let Unit = (parameterUnit === '百分比')? '%': '°C'
      //   return `${parameterName}${Unit}`
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.weatherList{
  width: 30rem;
  .cityBox{
    // display: inline-flex;
    // align-items: center;
  }
  .weatherBox{
    display: flex;
  }
}
</style>
