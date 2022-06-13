<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用氣象資料開放平臺取得觀測資料-一般天氣預報-今明 36 小時天氣預報"
        link="https://opendata.cwb.gov.tw/dataset/observation/O-A0003-001"
      />
      <Weather 
        :error="axioError"
        :allData="axioAllData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Weather from '@/components/Weather.vue'
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
      }
    }
  },
  components: {
    HelloWorld,
    Weather
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
    }
  }
}
</script>