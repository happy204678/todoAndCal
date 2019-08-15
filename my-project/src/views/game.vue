<template>
  <div class="game-bg">
    <div class="top">
      <div>
        <button @click="gameOver()" style="z-index: 100">結束遊戲</button>
      </div>
      <div class="word" v-if="!night">
        <span v-if="step === 99">請確認自己的身分...</span>

        <span v-if="step === 0">天亮請睜眼。昨晚{{killed[0] + 1}}號被殺死了。<br>死者請至淘汰區。</span>
        <span v-if="step === 1">請發表遺言。</span>
        <span v-if="step === 2 && player[0].length > 0">1號發言...</span>
        <span v-if="step === 3 && player[1].length > 0">2號發言...</span>
        <span v-if="step === 4 && player[2].length > 0">3號發言...</span>
        <span v-if="step === 5 && player[3].length > 0">4號發言...</span>
        <span v-if="step === 6 && player[4].length > 0">5號發言...</span>
        <span v-if="step === 7 && player[5].length > 0">6號發言...</span>
        <span v-if="step === 8 && player[6].length > 0">7號發言...</span>
        <span v-if="step === 9 && player[7].length > 0">8號發言...</span>
        <span v-if="step === 10 && player[8].length > 0">9號發言...</span>
        <span v-if="step === 11 && player[9].length > 0">10號發言...</span>
        <span v-if="step === 12">請選擇您要投票的人。</span>

      </div>
      <div class="identify" v-if="player.includes(loginName)">
        <div class="card-front"></div>
        <div class="card-back">
          <img v-if="identify.length > 0" :src="'/static/image/whokills/id' + identify[player.indexOf(loginName)] + '.jpg'"/>
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
      <button v-if="!night && step <= 11 && step >= 2" @click="nextstep()" >結束發言</button>
    </div>
    <div class="night" v-if="night">
      <span v-if="step === 0">天黑請閉眼。</span>
      <span v-if="step === 1">狼人現身請睜眼，請選擇要殺害的對象。</span>
      <span v-if="step === 2">狼人請閉眼。</span>
      <span v-if="step === 3">女巫請睜眼，他被殺死了，你要救他嗎？</span>
      <span v-if="step === 4">你要使用毒藥嗎？</span>
      <span v-if="step === 5">女巫請閉眼。</span>
      <span v-if="step === 6">預言家請睜眼，請選擇您要查驗的對象。</span>
      <span v-if="step === 7">預言家請閉眼。</span>

      <div class="wolfvote nightAction" v-if="(step === 1) && identify[player.indexOf(loginName)] === 5">
        <div v-for="(play, index) in player.filter(id => identify[player.indexOf(id)] === 5)" :key="index">
          <p :class="{red:(voteRes[player.indexOf(play)] !== null && voteRes[player.indexOf(play)] !== undefined)}">{{play}}選擇殺<a v-if="voteRes[player.indexOf(play)] !== null && voteRes[player.indexOf(play)] !== undefined">{{voteRes[player.indexOf(play)] + 1}}</a></p>
        </div>
        <div class="selectnumber" v-if="!decided">
          <button v-for="i in 10" :key="i" @click="vote(i)">{{i}}號</button>
        </div>
        <!-- <button @click="decideKill()" :disabled="decided && (voteRes[player.indexOf(loginName)] !== null)">確定</button> -->
        <span v-if="killed.length >= 0" class="red">...{{killed[0] + 1}}號被殺掉了</span>
      </div>

      <div class="witch nightAction" v-if="(step === 3 || step === 4) && identify[player.indexOf(loginName)] === 2">
        <span class="red">{{killed[0] + 1}}號被殺了</span>
        <div>
          <img @click="save()" src="/static/image/whokills/id9.jpg"/>
          <img @click="poison()" src="/static/image/whokills/id10.jpg"/>
        </div>
        <button @click="noSavePoison()">都不要</button>
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
      killed: Number,
      voteRes: [],
      tmpeyesnumber: Number,
      goodman: '',
      nightCount: Number,
      P1listenVote: '',
      decided: false
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
          case 99:
            setTimeout(() => {
              vm.setNight(true)
              vm.setStep(0)
            }, 4000)
            break
          case 0:
            setTimeout(() => {
              vm.setStep(1)
            }, 4000)
            break
          case 1: // wolfkill, the vote.length === 3 will continue
            break
          case 2:
            setTimeout(() => {
              vm.setStep(3)
            }, 3000)
            break
          case 3:
            setTimeout(() => { // witch save
              vm.setStep(4)
            }, 4000)
            break
          case 4:

            break
          case 5:
            setTimeout(() => {
              vm.setStep(6)
            }, 4000)
            break
          case 6:
            // eyes see
            break
          case 7:
            setTimeout(() => {
              vm.setStep(0)
              vm.setNight(false)
            }, 3000)
            break
        }
      } else {
        switch (val) {
          case 99:
            setTimeout(() => {
              vm.setNight(true)
              vm.setStep(0)
            }, 4000)
            break
          case 0:
            // if () { // 有遺言

            // }
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
          case 12:
            vm.setNight(true)
            vm.setStep(0)
            vm.setVote(99)
            vm.setKilled(99)
            break
        }
      }
    },
    P1listenVote (val) {
      if (this.player[0] === this.loginName) {

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

    }, 300)
    setTimeout(() => {
      vm.setNightCount(1)
    })

  },
  methods: {
    ...mapActions(['setLogout', 'getData', 'setGameOver', 'setVote', 'setStep', 'setNightCount', 'setKilled', 'setNight']),
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
        vm.killed = res.killed
        vm.night = res.night

        console.log('username', this.memberList)
        console.log('online : ', this.online)
        console.log('player : ', this.player)
        console.log('id : ', this.identify)
        console.log('vote : ', this.voteRes)
        console.log('killed', this.killed)
        console.log('step', this.step)
        console.log('night', this.night)
      })
    },
    vote (i) {
      var vm = this
      if (this.night) {
        let obj = {
          player: this.player.indexOf(vm.loginName),
          value: i - 1
        }
        this.setVote(obj)
        this.decided = true

        setTimeout(() => { // 等資料到

          let killedList = vm.voteRes.filter(num => num !== null) // [1,2,3]

          if (killedList.length === 3) { // 3人都投才進行
            let repeat = killedList.filter((e,i,a) => { return a.indexOf(e) !== i }) // 找出重複 []

            if (repeat !== []) { // 多數決
              vm.setKilled(repeat[0])
            } else { // 平票，3取一殺
              let result = killedList.filter((e,i,a) => { return a.indexOf(e) === i }) // 不重複 [1,2,3]
              vm.setKilled(vm.shuffle(result)[0]) // 洗牌後 殺第一個
            }

            // obj.value = 99
            // vm.setVote(obj)
            vm.setStep(2)
          }
        }, 1100)


      } else { // morning

      }
    },
    decideKill () {
      // push the killed person, then p1 watch the state, do func
      let killedList = this.voteRes.filter(num => num !== null) // [1,2,3]
      this.decided =true
      if (killedList.length === 3) { // 3人都投才進行
        let repeat = killedList.filter((e,i,a) => { return a.indexOf(e) !== i }) // 找出重複 []

        if (repeat !== []) { // 多數決
          this.setKilled(repeat[0])
        } else { // 平票，3取一殺
          let result = killedList.filter((e,i,a) => { return a.indexOf(e) === i }) // 不重複 [1,2,3]
          this.setKilled(this.shuffle(result)[0]) // 洗牌後 殺第一個
        }
        setTimeout(() => {
          this.setStep(2)
        }, 5000)
      }
    },
    save() {
      this.setStep(5)
    },
    poison () {
      this.setStep(5)
    },
    noSavePoison () {
      this.setStep(5)
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
    nextstep (i) {
      this.setStep(this.step + 1)
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
