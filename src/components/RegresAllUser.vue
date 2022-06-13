<template>
  <div>
    <div v-if="XMLHttpError">
      Error
    </div>
    <div v-else-if="userAllData.length === 0">
      No Users
    </div>
    <div v-else class="userBox">
      <!-- {{userAllData}} -->
      <div v-for="item in userAllData" :key="item.id">
        <b>{{`${item.first_name} ${item.last_name}`}}</b>
        <div class="imgBox">
          <img :src="item.avatar" :alt="`${item.first_name} ${item.last_name}`">
        </div>
        <p>{{item.email}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    XMLHttpError: Boolean,
    userAllData: Array
  }
}
</script>

<style scoped lang="scss">
.userBox {
  min-height: 25vh;
  >div{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 5px 10px;
    p{
      margin: 5px;
    }
    .imgBox{
      width: 128px;
      height: 128px;
      margin: auto;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
}
</style>
