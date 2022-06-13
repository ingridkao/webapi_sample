<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用Reqres來試試看Get target user"
        link="https://reqres.in/"
      />
      <h6>Get all user</h6>
      <RegresAllUser 
        :XMLHttpError="axioError"
        :userAllData="axioAllData"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import RegresAllUser from '@/components/RegresAllUser.vue'
import axios from 'axios'
export default {
  data(){
    return {
      axioError: false,
      axioAllData: []
    }
  },
  components: {
    HelloWorld,
    RegresAllUser
  },
  mounted(){
    this.AxiosFunc()
  },
  methods: {
    AxiosFunc(){
      axios.get('https://reqres.in/api/users').then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data.data
      }).catch((err) => {
        this.axioError = true
      })
    } 
  }
}
</script>