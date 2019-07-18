<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

@import "./assets/css/layout";

#app {
  background-color: rgb(19, 19, 19);
      position: relative;
    top: -4vw;
}
</style>
