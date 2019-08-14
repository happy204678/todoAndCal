<template>
  <div class="game-bg">
    <div class="top">
      <div>
        <button @click="gameOver()" style="z-index: 100">結束遊戲</button>
      </div>
      <div class="word" v-if="!night">
        <span v-if="nightCount === 0">請確認自己的身分...</span>

        <span v-if="step === 0">天亮請睜眼。昨晚{{}}號被殺死了。<br>死者請至淘汰區。</span>
        <span v-if="step === 1">請發表遺言。</span>
        <span v-if="step === 2 && player[1].length > 0">1號發言...</span>
        <span v-if="step === 3 && player[2].length > 0">2號發言...</span>
        <span v-if="step === 4 && player[3].length > 0">3號發言...</span>
        <span v-if="step === 5 && player[4].length > 0">4號發言...</span>
        <span v-if="step === 6 && player[5].length > 0">5號發言...</span>
        <span v-if="step === 7 && player[6].length > 0">6號發言...</span>
        <span v-if="step === 8 && player[7].length > 0">7號發言...</span>
        <span v-if="step === 9 && player[8].length > 0">8號發言...</span>
        <span v-if="step === 10 && player[9].length > 0">9號發言...</span>
        <span v-if="step === 11 && player[10].length > 0">10號發言...</span>
        <span v-if="step === 12">請選擇您要投票的人。</span>
      </div>
      <div class="identify" v-if="player.includes(loginName)">
        <div class="card-front"></div>
        <div class="card-back">
          <imgv-if="identify.length > 0" :src="'/static/image/whokills/id' + identify[player.indexOf(loginName)] + '.jpg'"/>
        </div>
      </div>
    </div>
    <div class="player" v-if="player.length > 0">
      <ul>
        <li v-for="(play, index) in player" :key="index" @click="vote(index)" :class="{'light': night && step === 1 && identify[player.indexOf(loginName)] === 5 && identify[player.indexOf(play)] === 5}">
          <div>
            <span>{{index + 1}}號位</span>
            <p :class="{'red': play === loginName}">{{play}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="pass-bt">
      <button v-if="!night && step <= 11 && step >=2" @click="nextstep" >結束發言</button>
    </div>
    <div class="night" v-if="night">
      <span v-if="step === 1">狼人現身請睜眼，請選擇要殺害的對象。</span>
      <span v-if="step === 2">狼人請閉眼。</span>
      <span v-if="step === 3">女巫請睜眼，他被殺死了，你要救他嗎？</span>
      <span v-if="step === 4">你要使用毒藥嗎？</span>
      <span v-if="step === 5">女巫請閉眼。</span>
      <span v-if="step === 6">預言家請睜眼，請選擇您要查驗的對象。</span>
      <span v-if="step === 7">預言家請閉眼。</span>

      <div class="wolfvote nightAction" v-if="(step === 1) && identify[player.indexOf(loginName)] === 5">
        <div v-for="(play, index) in player.filter(id => identify[player.indexOf(id)] === 5)" :key="index">
          <p>{{play}}選擇殺{{killed}}</p>
        </div>
        <div class="selectnumber">
          <button v-for="i in 10" :key="i" @click="vote(i)">{{i}}號</button>
        </div>
        <button>確定</button>
      </div>

      <div class="witch nightAction" v-if="(step === 3 || step === 4) && identify[player.indexOf(loginName)] === 2">

      </div>
      <div class="eyes nightAction" v-if="(step === 6) && identify[player.indexOf(loginName)] === 3">
        <div class="selectnumber">
          <button v-for="i in 10" :key="i" @click="eye(i)">{{i}}號</button>
        </div>
        <span class="eyecheck" >{{tmpeyesnumber}}號是{{goodman}}</span>
      </div>
      <div></div>
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
      player: [],
      online: 0,
      timer: '',
      randomSort: [],
      gameModelOG: [1, 1, 1, 2, 3, 4, 5, 5, 5],
      identify: [],
      gameStart: Boolean,
      night: true,
      step: Number,
      button: '',
      voteNum: Number,
      killed: 1,
      voteRes: [],
      tmpeyesnumber: Number,
      goodman: '',
      nightCount: Number
    }
  },
  watch: {
    gameStart (val) {
      let vm = this
      if (!val) {
        vm.gameOver()
      }
    },
    step (val) {
      let vm = this

      if (this.night) {
        switch (val) {
          case 0:
            // setTimeout(() => {
              vm.setStep(1)
            //   console.log('~~~~~~~~~~~', vm.step)
            // }, 4000)
            break
          case 1: // wolfkill, the vote.length === 3 will continue
            // setTimeout(() => {
            //   vm.step = 2
            //   console.log('~~~~~~~~~~~', vm.step)
            // }, 4000)
            break
          case 2:
            // setTimeout(() => {
            //   vm.step = 3
            //   console.log('~~~~~~~~~~~', vm.step)
            // }, 4000)
            break
          case 3:
            // setTimeout(() => {
            //   vm.step = 4
            //   console.log('~~~~~~~~~~~', vm.step)
            // }, 4000)
            break
          case 4:
            // setTimeout(() => {
            //   vm.step = 5
            // }, 4000)
            break
          case 5:
            // setTimeout(() => {
              // vm.step = 6
            // }, 4000)
            break
          case 6:
            // setTimeout(() => {
            //   vm.step = 7
            // }, 4000)
            break
          case 7:
            setTimeout(() => {
              vm.setStep(0)
              vm.night = false
            }, 3000)
            break
          case 8:
            // setTimeout(() => {
            //   vm.step = 1
            // }, 4000)
            break
        }
      } else {
        switch (val) {
           case 0:
            setTimeout(() => {
              vm.setStep(2)
              console.log('~~~~~~~~~~~', vm.step)
            }, 4000)
            break
          case 1:

            break
          case 2:

            break
          case 3:

            break
          case 4:

            break
          case 5:

            break
          case 6:

            break
          case 7:

            break
          case 8:

            break
        }
      }
    }
  },
  mounted () {
    var vm = this
    if (this.$route.params.id) {
      vm.loginName = vm.$route.params.id
    } else {
      this.$router.push({ path: '/login' })
    }

    $('.game-bg').fadeIn(1000)


    this.timer = setInterval(function () {
      vm.getdata()
    }, 1000)
    setTimeout(() => {
      // if (this.player.length > 0) {
      //   $('.player ul li:nth-child(1)').fadeIn(300, () => {
      //     $('.player ul li:nth-child(2)').fadeIn(300, () => {
      //       $('.player ul li:nth-child(3)').fadeIn(300, () => {
      //         $('.player ul li:nth-child(4)').fadeIn(300, () => {
      //           $('.player ul li:nth-child(5)').fadeIn(300, () => {
      //             $('.player ul li:nth-child(6)').fadeIn(300, () => {
      //               $('.player ul li:nth-child(7)').fadeIn(300, () => {
      //                 $('.player ul li:nth-child(8)').fadeIn(300, () => {
      //                   $('.player ul li:nth-child(9)').fadeIn(300, () => {
      //                     $('.player ul li:nth-child(10)').fadeIn(300, () => {
      //                     })
      //                   })
      //                 })
      //               })
      //             })
      //           })
      //         })
      //       })
      //     })
      //   })
      // }
      vm.setStep(6)
    }, 300)
    setTimeout(() => {
      vm.setNightCount(1)
    })
  },
  methods: {
    ...mapActions(['setLogout', 'getData', 'setGameOver', 'setVote', 'setStep', 'setNightCount']),
    getdata (data) {
      var vm = this

      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.player = res.player
        vm.online = res.userName.length
        vm.identify = res.identify
        vm.gameStart = res.gameStart
        vm.voteRes = res.vote
        vm.step = res.step

        console.log('username', this.memberList)
        console.log('online : ', this.online)
        console.log('player : ', this.player)
        console.log('id : ', this.identify)
        console.log('vote : ', this.voteRes)
      })
    },
    vote (i) {
      if (this.night) {
        this.setVote(this.player.indexOf(this.loginName), i)
      } else { // morning

      }
    },
    wolfkill () {

    },
    eye (i) {
      let vm = this
      this.tmpeyesnumber = i
      if (this.identify[i - 1] === 5) {
        this.goodman = '狼人'
      } else {
        this.goodman = '好人'
      }
      $('.eyecheck').fadeIn(300)
      $('.eyes button').attr('disabled', true)

      setTimeout(() => {
        // vm.step = 7
        vm.setStep(7)
      }, 3000)
    },
    gameOver () {
      this.setStep(0)
      this.setGameOver()
      this.closePage()
    },
    closePage () {
      let num = this.memberList.indexOf(this.loginName)
      if (num >= 0) {
        this.setLogout(num)
      }
      window.clearInterval(this.timer)
      this.$router.push({ path: '/login' })
    }
  },
  beforeDestroy () {
    if (this.startKey === false) {
      this.closePage()
    }
  }
}
</script>
