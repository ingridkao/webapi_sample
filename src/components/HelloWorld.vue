<template>
  <div class="hello">
    <a :href="link" target="_blank" rel="noreferrer noopenner">
      {{ msg }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    link: String
  }
}
</script>

<style scoped lang="scss">
</style>
