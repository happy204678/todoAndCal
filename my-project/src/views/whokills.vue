<template>
  <div class="whokills">
    <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <ul>
          <li>123</li>
        </ul>
      </div>
    </div>
    <div class="memberSeat">
      <ul>
        <li @click="sit(0)"></li>
        <li @click="sit(1)"></li>
        <li @click="sit(2)"></li>
        <li @click="sit(3)"></li>
        <li @click="sit(4)"></li>
        <li @click="sit(5)"></li>
        <li @click="sit(6)"></li>
        <li @click="sit(7)"></li>
        <li @click="sit(8)"></li>
        <li @click="sit(9)"></li>
      </ul>
    </div>
    <!-- <div class="chatArea">
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    sit (number) {

    }
  }



}
</script>



<style scoped>

</style>
