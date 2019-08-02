<template>
  <div class="whokills">
    <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <h3>人員列表</h3>
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}">{{member}}</li>
        </ul>
        <span>{{memberList.length}}人</span>
      </div>
      <button @click="notready()">觀戰</button>
    </div>
    <div class="row1" v-if="sitseat.length > 0">
      <div class="memberSeat" @click="sit(2)" :class="{'active': sitseat[2] === true}">3</div>
      <div class="memberSeat" @click="sit(3)" :class="{'active': sitseat[3] === true}">4</div>
      <div class="memberSeat" @click="sit(4)" :class="{'active': sitseat[4] === true}">5</div>
      <div class="memberSeat" @click="sit(5)" :class="{'active': sitseat[5] === true}">6</div>
      <div class="memberSeat" @click="sit(6)" :class="{'active': sitseat[6] === true}">7</div>
      <div class="memberSeat floatright" @click="sit(7)" :class="{'active': sitseat[7] === true}">8</div>
    </div>
    <div class="row2" v-if="sitseat.length > 0">
      <div class="memberSeat" @click="sit(1)" :class="{'active': sitseat[1] === true}">2</div>
      <div class="memberSeat floatright" @click="sit(8)" :class="{'active': sitseat[8] === true}">9</div>
    </div>
    <div class="row3" v-if="sitseat.length > 0">
      <div class="memberSeat" @click="sit(0)" :class="{'active': sitseat[0] === true}">1</div>
      <button class="mid"><span>開始遊戲</span></button>
      <div class="memberSeat floatright" @click="sit(9)" :class="{'active': sitseat[9] === true}">10</div>
    </div>
    <!-- <div class="chatArea">
    </div> -->
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      loginName: '',
      memberList: [],
      playGame: [],
      sitseat: [],
      sitnumber: 99,
      timer: ''
    }
  },
  computed: {
    ...mapGetters(['userName', 'ip', 'identify'])
  },
  watch: {

  },
  mounted () {
    var vm = this

    $('.whokills').fadeIn(2000)

    if (this.$route.params.id) {
      vm.loginName = vm.$route.params.id
    } else {
      this.$router.push({ path: '/login' })
    }
    this.timer = setInterval(function () {
      vm.getdata()
    }, 1000)

    window.onbeforeunload = function (e) { // close page
      vm.closePage()
    }
  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame', 'setLogout', 'getData', 'setSeat']),
    sit (number) {
      if (this.sitnumber === 99) { // 第一次入座
        // set state
        let num = this.memberList.indexOf(this.loginName)
        this.setPlayGame(num) // state
        this.sitnumber = number // store sit num
        this.setSeat(number) // active
        console.log(111111)
      } else { // 已入座
        if (number === this.sitnumber) {
        } else if (this.sitseat[number] === true) {
          window.alert('有人坐了')
          this.sitseat[this.sitnumber] = false
        } else if (this.sitseat[number] === false) { // change seat
          this.setSeat(this.sitnumber) // state
          this.sitnumber = number
          this.setSeat(number) // state
        }
      }
    },
    notready () {
      if (this.sitnumber !== 99) {
        this.setSeat(this.sitnumber)
        let num = this.memberList.indexOf(this.loginName)
        this.setPlayGame(num)
        this.sitnumber = 99
      }
    },
    getdata (data) {
      var vm = this

      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.playGame = res.playGame
        vm.online = res.userName.length
        vm.sitseat = res.seat

        console.log('username', this.memberList)
        console.log('playgame', this.playGame)
        console.log('seat : ', this.sitseat)
        console.log('online : ', this.online)
      })
    },
    closePage () {
      let num = this.memberList.indexOf(this.loginName)
      if (num >= 0) {
        this.setLogout(num)
        if (this.playGame[num] === true) {
          this.setSeat(this.sitnumber)
        }
      }
      window.clearInterval(this.timer)
      this.$router.push({ path: '/login' })
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
