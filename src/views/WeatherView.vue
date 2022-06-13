<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用氣象資料開放平臺取得觀測資料"
        link="https://opendata.cwb.gov.tw/index"
      />
      <div>
        <ol>
          <li>必填：</li>
        </ol>
      </div>
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
      params:{},
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
      axios.get(``, {
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