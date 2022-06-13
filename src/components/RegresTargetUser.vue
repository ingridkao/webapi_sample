<template>
  <div>
    <div v-if="error">
      Error
    </div>
    <div v-else-if="targetData && Object.keys(targetData).length === 0">
      No Users
    </div>
    <div v-else class="userBox">
      {{targetData}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    targetData: Object || null
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
