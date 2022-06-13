<template>
  <div>
    <div v-if="XMLHttpError">
      Error
    </div>
    <div v-else-if="allData.length === 0">
      No Data
    </div>
    <div v-else class="dataBox">
      <div v-for="item in allData" :key="item.StationID">
        {{item.StationUID}} | {{item.StationName.Zh_tw}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    allData: Array
  }
}
</script>

<style scoped lang="scss">
.dataBox {
  max-height: 100px;
  overflow: scroll;
}
</style>
