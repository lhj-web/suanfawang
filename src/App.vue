<template>
  <div id="app">
    <keep-alive exclude="ListDetail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="stylus"></style>
