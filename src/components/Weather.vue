<template>
  <div>
    <div v-if="error">
      Error
    </div>
    <div v-else-if="allData.length === 0">
      No Data
    </div>
    <table v-else class="userBox">
      <th v-for="(item, index) in title" :key="index">
        <!-- Vue3後，Object可以被自動解析不用用Object.values -->
        {{item}}
      </th>
      <tr v-for="item in allData" :key="item.locationName">
        <td>{{item.locationName}}</td>
        <td v-for="(el, index) in item.weatherElement" :key="index">
          <div v-for="(weather, index2) in el.time" :key="index2">
            <!-- {{weather.startTime}}-{{weather.endTime}} -->
            {{weather.parameter.parameterName}}{{weather.parameter.parameterUnit}}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    allData: Array
  },
  data(){
    return{
      title: {
        locationName: '縣市',
        weatherElement: '天氣'
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
