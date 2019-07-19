<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',


  methods: {
    ...mapActions(['setLogoutCountDown'])
  },
  destroyed () {
    window.clearInterval(this.logoutTimer)
  }
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
