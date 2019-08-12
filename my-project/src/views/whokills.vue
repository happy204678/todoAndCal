<template>
  <div class="hall">
    <!-- <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <h3>人員列表</h3>
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}"><span>{{member}}</span><span v-if="playGame[memberList.indexOf(member)]"><-- 準備</span></li>
        </ul>
        <span class="countPoeple">{{memberList.length}}人</span>
      </div>
      <button @click="notready()">觀戰</button>
    </div> -->
    <div class="readymember floatl">
      <h1>狼人殺</h1>
      <button>開始遊戲</button>
    </div>
    <div class="member floatr">
      <h3>人員列表</h3>
      <div class="memberList">
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}"><span>{{member}}</span></li>
        </ul>
        <span class="countPoeple">{{memberList.length}}人</span>
      </div>
      <div class="ready">
        <button @click="sit()">入座</button>
      </div>
    </div>
    <div class="modeselect floatr">
      <h3>模式選擇</h3>
      <div>
        <button class="modebutton">OG</button>
      </div>
    </div>
    <div class="carddisplay floatl">
      <div class="information">
        <ul>
          <li>4民</li>
          <li>1預言家</li>
          <li>1女巫</li>
          <li>1獵人</li>
          <li>3狼</li>
        </ul>
      </div>
      <div class="card">
        <img src="../assets/images/whokills/1.jpg"/>
        <img src="../assets/images/whokills/eyes.jpg"/>
        <img src="../assets/images/whokills/witch.jpg"/>
        <img src="../assets/images/whokills/hunter.jpg"/>
        <img src="../assets/images/whokills/wolf.jpg"/>
        <img src="../assets/images/whokills/wolf.jpg"/>
        <img src="../assets/images/whokills/wolf.jpg"/>
      </div>
    </div>
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
      timer: '',
      ready: false,
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

    $('.hall').fadeIn(2000)

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
    ...mapActions(['setIp', 'setUserName', 'setPlayGame', 'setLogout', 'getData', 'setPlayer', 'setIdentify']),
    sit (number) {
      if (!this.ready) { // 第一次入座
        // set state
        let num = this.memberList.indexOf(this.loginName)
        this.setPlayGame(num) // state
        this.sitnumber = number // store sit num
        this.setPlayer(this.loginName)
        this.ready = true
      } else { // 已入座
        if (number === this.sitnumber) {
        } else if (this.sitseat[number] === true) {
          window.alert('有人坐了')
          this.sitseat[this.sitnumber] = false
        } else if (this.sitseat[number] === false) { // change seat
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
        vm.player = res.player

        console.log('username', this.memberList)
        console.log('playgame', this.playGame)
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
          $('.hall').fadeOut(2000, function () {
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
