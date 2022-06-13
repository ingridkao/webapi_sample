<template>
  <div>
    <div>
      <HelloWorld 
        msg="使用Reqres來試試看Get target user"
        link="https://reqres.in/"
      />
      <h6>Get all user: response是陣列[]</h6>
      <RegresAllUser 
        :XMLHttpError="axioError"
        :userAllData="axioAllData"
      />
      <h6>Get traget user: response是物件{}</h6>
      <div v-if="axioTargetError">
        Error
      </div>
      <div v-else>
        {{axioTargetData? axioTargetData: 'No Users'}}
      </div>
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
      axioAllData: [],
      axioTargetError: false,
      axioTargetData: {}
    }
  },
  components: {
    HelloWorld,
    RegresAllUser
  },
  mounted(){
    this.AxiosFunc()
    this.AxiosTargetFunc()
  },
  methods: {
    AxiosFunc(){
      axios.get('https://reqres.in/api/users').then((response) => {
        this.axioError = (response.status !== 200)
        this.axioAllData = response.data.data
      }).catch((err) => {
        this.axioError = true
      })
    },
    AxiosTargetFunc(){
      axios.get('https://reqres.in/api/users/2').then((response) => {
        this.axioTargetError = (response.status !== 200)
        this.axioTargetData = response.data.data
      }).catch((err) => {
        this.axioTargetError = true
      })
    } 
  }
}
</script>