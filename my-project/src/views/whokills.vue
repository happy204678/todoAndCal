<template>
  <div class="hall">
    <div class="readymember floatl">
      <h1>狼人殺</h1>
      <button @click="startGame" :disabled="disabled">開始遊戲</button> <!-- v-if="player.indexOf(loginName) === 0" -->
    </div>
    <div class="member floatr">
      <h3>人員列表</h3>
      <button @click="closePage()">登出</button>
      <div class="memberList">
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index" :class="{'red': member === loginName}"><span>{{member}}</span><span v-if="player.indexOf(member) >= 0">準備</span></li>
        </ul>
        <span class="countPoeple">{{memberList.length}}人</span>
      </div>
      <div class="ready">
        <button @click="sit()">{{sitvalue}}</button>
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
        <img src="/static/image/whokills/id1.jpg"/>
        <img src="/static/image/whokills/id3.jpg"/>
        <img src="/static/image/whokills/id2.jpg"/>
        <img src="/static/image/whokills/id4.jpg"/>
        <img src="/static/image/whokills/id5.jpg"/>
        <img src="/static/image/whokills/id5.jpg"/>
        <img src="/static/image/whokills/id5.jpg"/>
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
      timer: '',
      startKey: Boolean,
      player: [],
      id: [],
      sitvalue: '準備',
      disabled: false
    }
  },
  computed: {
     ...mapGetters(['OGMode'])
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
          $('.hall').fadeOut(2000, function () {
            vm.$router.push({ path: '/game/' + vm.loginName })
          })
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

    //抓data
    this.timer = setInterval(function () {
      vm.getdata()
    }, 1000)

    // if (this.startKey === false) {
    //   window.onunload = function (e) { // close page
    //     window.alert('on')
    //     vm.closePage()
    //   }
    //   window.onload = (e) => { // 重整
    //   window.alert('re')
    //     vm.closePage()
    //   }
    // }
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
      // this.setIdentify(this.OGMode)
      // 開始
      window.clearInterval(this.timer)
      let a = this.player

      // sort
      this.setSortPlayer(this.shuffle(this.player))
      this.setIdentify(this.shuffle(this.OGMode))
      this.setGameStart()
      window.setTimeout(function () {
        $('.hall').fadeOut(2000, function () {
          vm.$router.push({ path: '/game/' + vm.loginName })
        })
      }, 500)
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
      let len = arr.length;

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
