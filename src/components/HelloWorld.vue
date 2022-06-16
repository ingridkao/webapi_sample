<template>
  <a :href="link" target="_blank" rel="noreferrer noopenner">
    {{ msg }}
  </a>
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
