<template>
  <div>
    <div v-if="XMLHttpError">
      Error
    </div>
    <div v-else-if="allData.length === 0">
      No Data
    </div>
    <div v-else class="dataBox">
      {{allData}}
      <!-- <div v-for="item in allData" :key="item.id">
        <b>{{`${item.first_name} ${item.last_name}`}}</b>
        <div class="imgBox">
          <img :src="item.avatar" :alt="`${item.first_name} ${item.last_name}`">
        </div>
        <p>{{item.email}}</p>
      </div> -->
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
  min-height: 25vh;
}
</style>
