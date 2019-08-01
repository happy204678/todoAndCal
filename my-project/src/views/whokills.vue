<template>
  <div class="whokills">
    <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <h3>觀戰人員列表</h3>
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{red: member === loginName}">{{member}}</li>
        </ul>
        <span>{{memberList.length}}人</span>
      </div>
      <button @click="goMemberList()">觀戰</button>
    </div>
    <div class="row1">
      <div class="memberSeat">3</div>
      <div class="memberSeat">4</div>
      <div class="memberSeat">5</div>
      <div class="memberSeat">6</div>
      <div class="memberSeat">7</div>
      <div class="memberSeat floatright">8</div>
    </div>
    <div class="row2">
      <div class="memberSeat ">2</div>
      <div class="memberSeat floatright">9</div>
    </div>
    <div class="row3">
      <div class="memberSeat">1</div>
      <button class="mid"><span>開始遊戲</span></button>
      <div class="memberSeat floatright">10</div>
    </div>
    <!-- <div class="chatArea">
    </div> -->
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'
import store from 'storejs'
import * as types from '../store/mutation-types'
export default {
  data () {
    return {
      loginName: '',
      memberList: [],
      timer: ''
      // onLine: navigator.onLine,
    }
  },
  computed: {
    ...mapGetters(['userName', 'ip', 'identify', 'playGame']),
  },
  watch: {

  },
  mounted () {
    var vm = this

    $('.whokills').fadeIn(2000)

    // vm.bus.$on('playerNumber', function (val) {
    //   console.log('emit', val)
    //   vm.playerNumber = val
    // })
    if (this.$route.params.id) {
      vm.loginName = vm.$route.params.id
    } else {
      this.$router.push({ path: '/login' })
    }
    this.timer = setInterval(function() {
        vm.getdata()
    }, 1000)

    window.onbeforeunload = function (e) {
      vm.closePage()
    }
  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame', 'setLogout', 'getData']),
    sit (number) {

    },
    goMemberList () {

    },
    getdata (data) {
      var vm = this
      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.online = res.userName.length
      })

      console.log('username', this.memberList)
      console.log('online : ' + this.online)
    },
    closePage () {
      let num = this.memberList.indexOf(this.loginName)
      if (num >= 0) {
        this.setLogout(num)
      }

      this.$router.push({ path: '/login' })

      window.clearInterval(this.timer)
    }
  },
  beforeDestroy () {
    this.closePage()
  },
  destroyed () {

  }
}
</script>
<style scoped>
</style>
