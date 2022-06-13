<template>
  <div>
    <div v-if="XMLHttpError">
      Error
    </div>
    <div v-else>
      {{userAllData.length > 0 ? userAllData: 'No Users'}}
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
</style>
