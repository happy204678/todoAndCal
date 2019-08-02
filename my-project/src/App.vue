<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
  // destroyed () {
  //   window.clearInterval(this.logoutTimer)
  // }
}
</script>

<style>

@import "./assets/css/layout";

#app {
  background-color: rgb(19, 19, 19);
  /* position: relative; */
  top: -4vw;
  /* height: 100% */
}
</style>
