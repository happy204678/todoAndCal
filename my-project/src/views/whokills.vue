<template>
  <div class="hall">
    <div class="readymember floatl">
      <h1>狼人殺</h1>
      <div>
        <h2>遊玩須知：</h2>
        <ul>
          <li>1.如果要重整或關閉，請登出至登入頁面再操作，遊戲脆弱請見諒。</li>
          <li>2.目前只有10人OG局（其他局為DEMO而已，無功能）。</li>
          <li>3.如果遊戲已開始，將會自動跳轉至遊戲頁面，跳轉時別亂按，遊戲脆弱請見諒。</li>
          <li>4.遊戲帳號是開發者設定的，無法自己申請。</li>
          <li>5.目前需透過其他即時對話平台聊天，遊戲時請遵守發言權。</li>
          <li>6.請確認遊戲開始至結束可以完整參與，除非已被淘汰，否則會影響其他玩家體驗。</li>
        </ul>
      </div>
      <div>
        <h2>遊戲規則：</h2>
        <ul>
          <li>1.大概同嗷嗚狼人殺規則，較特別之案例以下。</li>
          <li>2.無確認身分階段，開局後身分牌就會一直在頁面右上方，請翻牌查看。</li>
          <li>3.狼人殺人、女巫毒人、預言家驗人、獵人帶人請想好再按，無法反悔。</li>
          <li>4.被獵人或狼王帶走會沒有遺言。</li>
          <li>5.獵人死時可以選擇不開槍，若不開槍，將不會有任何訊息(如果再沒有遺言的情況，會等獵人決定好再繼續，不是LAG)。</li>
          <li>6.狼人不能連續兩晚殺同一個人。</li>
          <li>7.目前勝利條件會在遺言之後判定，請見諒。</li>
        </ul>
      </div>
      <p>****想要提升遊戲體驗請斗內！****</p>
      <button @click="startGame" :disabled="disabled">開始遊戲</button> <!-- v-if="player.indexOf(loginName) === 0" -->
    </div>
    <div class="member floatr">
      <h3>人員列表</h3>
      <button @click="closePage()">登出</button>
      <div class="memberList">
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}"><span>{{ member }}</span><span v-if="player.indexOf(member) >= 0"> ->準備</span></li>
        </ul>
        <span class="countPoeple">{{ memberList.length }}人</span>
      </div>
      <div class="ready">
        <button @click="sit()">{{sitvalue}}</button>
      </div>
    </div>
    <div class="modeselect floatr">
      <h3>模式選擇</h3>
      <div>
        <button class="modebutton" @click="changeMode(0)" :class="{'selectMode': pos === 0}">OG</button>
        <button class="modebutton" @click="changeMode(1)" :class="{'selectMode': pos === 1}">騎士狼王局</button>
      </div>
    </div>
    <div class="carddisplay floatl">
      <div class="information">
        <ul>
          <li>{{ selectMode.filter(n => n === 1).length }}民</li>
          <li>{{ selectMode.filter(n => n === 3).length }}預言家</li>
          <li>{{ selectMode.filter(n => n === 2).length }}女巫</li>
          <li>{{ selectMode.filter(n => n === 4).length }}獵人</li>
          <li v-if="selectMode.includes(6)">{{ selectMode.filter(n => n === 6).length }}騎士</li>
          <li v-if="selectMode.includes(7)">{{ selectMode.filter(n => n === 7).length }}狼王</li>
          <li>{{ selectMode.filter(n => n === 5).length }}狼</li>
        </ul>
      </div>
      <div class="card">
        <img v-if="pos === 0" src="/static/image/whokills/id1.jpg"/>
        <img v-if="pos === 1" src="/static/image/whokills/id6.jpg"/>
        <img src="/static/image/whokills/id3.jpg"/>
        <img src="/static/image/whokills/id2.jpg"/>
        <img src="/static/image/whokills/id4.jpg"/>
        <img src="/static/image/whokills/id5.jpg"/>
        <img v-if="pos === 0" src="/static/image/whokills/id5.jpg"/>
        <img v-if="pos === 1" src="/static/image/whokills/id7.jpg"/>
        <img src="/static/image/whokills/id5.jpg"/>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      loginName: '',
      memberList: [],
      timer: '',
      startKey: Boolean,
      player: [],
      id: [],
      sitvalue: '準備',
      disabled: false,
      pos: 0,
      selectMode: [1, 1, 1, 1, 2, 3, 4, 5, 5, 5], // default
      OGMode: [1, 1, 1, 1, 2, 3, 4, 5, 5, 5], // 1平民 2女巫 3預言家 4獵人 5狼
      wolfKingMode: [1, 1, 1, 2, 3, 4, 6, 5, 5, 7] // 6騎士 7狼王
    }
  },
  computed: {
  },
  watch: {
    // player (val) {
    //   if (val.length === 10) {
    //     this.disabled = false
    //   } else {
    //     this.disabled = true
    //   }
    // },
    startKey (val) {
      let vm = this
      if (val) {
        window.setTimeout(function () {
          // $('.hall').fadeOut(2000, function () {
            vm.$router.push({ path: '/game/' + vm.loginName })
          // })
        }, 500)
      }
    }
  },
  mounted () {
    var vm = this
    $('.hall').fadeIn(2000)
    // catch login name
    if (this.$route.params.id) {
      vm.loginName = vm.$route.params.id
    } else {
      this.$router.push({ path: '/login' })
    }
    // 抓data
    this.timer = setInterval(function () {
      vm.getdata()
    }, 1000)
  },
  methods: {
    ...mapActions(['setUserName', 'setLogout', 'getData', 'setPlayer', 'setIdentify', 'setPopPlayer', 'setGameStart', 'setSortPlayer']),
    sit () {
      if (this.player.indexOf(this.loginName) < 0) { // 入座
        this.setPlayer(this.loginName)
        this.sitvalue = '觀戰'
      } else { // 觀戰
        let num = this.player.indexOf(this.loginName)
        this.setPopPlayer(num)
        this.sitvalue = '準備'
      }
    },
    getdata () {
      var vm = this

      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.online = res.userName.length
        vm.player = res.player
        vm.startKey = res.gameStart

        console.log('loginName', this.loginName)
        console.log('username', this.memberList)
        console.log('player', this.player)
        console.log('online : ', this.online)
        console.log(vm.startKey)
      })
    },
    startGame () {
      let vm = this
      // 開始
      window.clearInterval(this.timer)

      // sort
      this.setSortPlayer(this.shuffle(this.player))
      this.setIdentify(this.shuffle(this.selectMode))
      this.setGameStart()
      window.setTimeout(function () {
        $('.hall').fadeOut(2000, function () {
          vm.$router.push({ path: '/game/' + vm.loginName })
        })
      }, 500)
    },
    changeMode (val) {
      this.pos = val
      if (val === 0) {
        this.selectMode = this.OGMode
      } else if (val === 1) {
        this.selectMode = this.wolfKingMode
      }
    },
    sortPlayer (arr) {
      let a = arr
      a.sort(() => { this.random() })
      this.setPlayer(a)
    },
    sortMode (mode) { // set type of game. ex: OG
      mode = mode.sort(this.random())
      this.setIdentify(mode)
    },
    shuffle (arr) {
      let len = arr.length

      while (len) {
        let i = (Math.random() * len--) >> 0
        // 交换位置
        let temp = arr[len]
        arr[len] = arr[i]
        arr[i] = temp
      }
      return arr
    },
    random () {
      return Math.random() > 0.5 ? -1 : 1
    },
    closePage () {
      let num = this.memberList.indexOf(this.loginName)
      let playernum = this.player.indexOf(this.loginName)
      if (num >= 0) {
        this.setLogout(num)
      }
      if (playernum >= 0) {
        this.setPopPlayer(playernum)
      }

      window.clearInterval(this.timer)
      this.$router.push({ path: '/login' })
    }
  },
  beforeDestroy () {
    // window.alert('on')
    // this.closePage()
  },
  destroyed () {
    window.clearInterval(this.timer)
  }
}
</script>
<style scoped>
</style>
