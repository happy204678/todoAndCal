<template>
  <div class="whokills">
    <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <h3>人員列表</h3>
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}"><span>{{member}}</span><span v-if="playGame[memberList.indexOf(member)]"><-- 準備</span></li>
        </ul>
        <span class="countPoeple">{{memberList.length}}人</span>
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
      <button class="mid" @click="startGame()"><span>開始遊戲</span></button>
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
      timer: '',
      ready: false,
      playerNumber: 99,
      startKey: false,
      player: [],
      id: []
    }
  },
  computed: {
     ...mapGetters(['OGMode'])
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
    }, 300)

    if (this.startKey === false) {
      window.onunload = function (e) { // close page
        vm.closePage()
      }
      window.onload = (e) => { // 重整
        vm.closePage()
      }
    }
  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame', 'setLogout', 'getData', 'setSeat', 'setPlayer', 'setIdentify']),
    sit (number) {
      if (this.sitnumber === 99) { // 第一次入座
        // set state
        let num = this.memberList.indexOf(this.loginName)
        this.playerNumber = num
        this.setPlayGame(num) // state
        this.sitnumber = number // store sit num
        this.setSeat(number) // active
        this.setPlayer(this.loginName)
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
        vm.player = res.player

        console.log('username', this.memberList)
        console.log('playgame', this.playGame)
        console.log('seat : ', this.sitseat)
        console.log('online : ', this.online)
      })
    },
    startGame () {
      let key = false
      let vm = this
      let count = 0
      // for (let i = 0; this.sitseat.length; i++) {
      //   if (this.sitseat[i] === true) {
      //     count++
      //   } else {
      //     break
      //   }
      //   if (count === 10) {
      //     key = true
      //   }
      // }
      key = true
      if (key === true) {
        // 開始
        this.startKey = true
        window.clearInterval(this.timer)
        let a = this.player
        this.sortPlayer(this.player)
        // this.setMode(this.OGMode)

        window.setTimeout(function () {
          $('.whokills').fadeOut(2000, function () {
            vm.$router.push({ path: '/game/' + vm.loginName })
          })
        }, 500)
      } else {
        window.alert('位子未滿')
      }
    },
    sortPlayer (arr) {
      let a = arr
      a.sort(() => { this.random() })
      this.setPlayer(a)
    },
    setMode (mode) { // set type of game. ex: OG
      mode = mode.sort(this.random())
      this.setIdentify(mode)
    },
    random () {
      return Math.random() > 0.5 ? -1 : 1
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
    if (this.startKey === false) {
      this.closePage()
    }
  },
  destroyed () {

  }
}
</script>
<style scoped>
</style>
