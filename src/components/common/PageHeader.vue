<template>
  <header class="alignCenter" height="auto">
    <img src="../../assets/image/title.jpg" id="main-img">
    <h1>生命建造程序</h1>
    <h3>{{ title }}</h3>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
