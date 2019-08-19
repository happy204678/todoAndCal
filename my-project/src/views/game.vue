<template>
  <div class="game-bg">
    <div class="top">
      <span v-if="night">第{{nightCountSpan}}夜</span>
      <span v-else>第{{nightCountSpan}}日</span>
      <div>
        <button @click="gameOver()" style="z-index: 100">結束遊戲</button>
      </div>
      <div class="word" v-if="!night">
        <span v-if="step === 99">請確認自己的身分...</span>

        <span v-if="step === 0 && killed.length > 0">天亮請睜眼。昨晚<span class="red" v-for="kill in killed" :key="kill">{{kill + 1}}號</span>被殺死了。</span>
        <span v-if="step === 0 && killed.length === 0">天亮請睜眼。昨晚是平安夜。</span>
        <span v-if="step === 1 && nightCount === 0">{{ killed[0] + 1 }}號請發表遺言。</span>
        <span v-if="step === 2 && player[0] !== ''">1號開始發言...</span>
        <span v-if="step === 3 && player[1] !== ''">2號發言...</span>
        <span v-if="step === 4 && player[2] !== ''">3號發言...</span>
        <span v-if="step === 5 && player[3] !== ''">4號發言...</span>
        <span v-if="step === 6 && player[4] !== ''">5號發言...</span>
        <span v-if="step === 7 && player[5] !== ''">6號發言...</span>
        <span v-if="step === 8 && player[6] !== ''">7號發言...</span>
        <span v-if="step === 9 && player[7] !== ''">8號發言...</span>
        <span v-if="step === 10 && player[8] !== ''">9號發言...</span>
        <span v-if="step === 11 && player[9] !== ''">10號發言...</span>

        <span v-if="step === 12">請選擇您要投票的人。</span>
        <span v-if="step === 12 && voteRes[player.indexOf(loginName)].length > 0" class="red" ><br>你要投{{voteRes[player.indexOf(loginName)]}}號</span>
        <div class="selectnumber" v-if="!decided && step === 12">
          <button v-for="i in 10" :key="i" @click="vote(i)">{{i}}號</button>
          <button v-for="i in 10" :key="i" @click="vote(99)">不投</button>
        </div>
        <span v-if="step === 20" v-for="kill in killed" :key="kill">{{player[kill]}}號平票，請進行辯論</span>
        <span v-if="step === 40">{{killed[0]}}號發言</span>
        <span v-if="step === 41">{{killed[1]}}號發言</span>
        <span v-if="step === 42 && killed.length === 3">{{killed[2]}}號發言</span>
        <span v-if="step === 43 && killed.length === 4">{{killed[3]}}號發言</span>
        <span v-if="step === 44 && killed.length === 5">{{killed[4]}}號發言</span>
        <span v-if="step === 45 && killed.length === 6">{{killed[5]}}號發言</span>
        <span v-if="step === 46 && killed.length === 7">{{killed[6]}}號發言</span>
        <span v-if="step === 47 && killed.length === 8">{{killed[7]}}號發言</span>
        <span v-if="step === 48 && killed.length === 9">{{killed[8]}}號發言</span>
        <span v-if="step === 49 && killed.length === 10">{{killed[9]}}號發言</span>

        <!-- 平票在回step 12 -->

        <span v-if="step === 23">{{ killed[0] + 1 }}號被票死了，請發表遺言</span>

        <span v-if="step === 24">平票，進入夜晚。</span>
        <span v-if="step === 25">沒人投票，進入夜晚。</span>

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
      <button v-if="!night && step >= 1 && step <= 11" @click="nextstep()" >結束發言</button> <!--step === player.indexOf(loginName) + 2 || (step === 1 && killed[0] === player.indexOf(loginName))-->
      <button v-if="!night && step === 12" @click="nextstep()" >結束發言</button>
      <button v-if="!night && step >= 40 && step <= 49" @click="talknextstep()" >結束發言</button>
      <button v-if="!night && step === 23" @click="lastword()" >結束發言</button>
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
          <button v-for="i in 10" :key="i" v-if="player[i - 1] !== ''" @click="vote(i)">{{i}}號</button>
        </div>
        <!-- <button @click="decideKill()" :disabled="decided && (voteRes[player.indexOf(loginName)] !== null)">確定</button> -->
        <span v-if="killed.length > 0" class="red">...{{killed[0] + 1}}號被殺掉了</span>
      </div>

      <div class="witch nightAction" v-if="(step === 3 || step === 4) && identify[player.indexOf(loginName)] === 2">
        <span class="red">{{killed[0] + 1}}號被殺了</span>
        <div class="witchCard">
          <img @click="save()" :class="{displaynone: killed[0] !== player.indexOf(loginName) + 1, displayunset: nightCount === 0}" src="/static/image/whokills/id9.jpg"/>
          <img @click="poisonFadein()" src="/static/image/whokills/id10.jpg"/>
        </div>
        <button @click="noSaveOrPoison()">不要</button>
        <div class="poison-btn">
          <button v-for="i in 10" :key="i" v-if="i !== player.indexOf(loginName) + 1 && player[i - 1] !== ''" @click="poison(i - 1)">{{ i }}號</button>
        </div>
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
      killed: Number,
      voteRes: [],
      tmpeyesnumber: Number,
      goodman: '',
      nightCount: Number,
      nightCountSpan: '',
      P1listenVote: '',
      decided: false,
      even: 0,
      firstlastword: true
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
            if (vm.killed.length === 0) {
              setTimeout(() => {
                vm.setStep(1)
              }, 4000)
            } else {

            }

            break
          case 1: // wolfkill, the vote.length === 3 will continue
            break
          case 2:
            setTimeout(() => {
              vm.setStep(3)
            }, 3000)
            break
          case 3:
            setTimeout(() => {
              vm.setStep(4)
            }, 4000)
            break
          case 4: // witch save
            if (vm.player[vm.identify.indexOf(2)] === '') {
              setTimeout(() => {
                vm.setStep(5)
              }, 4000)
            }
            break
          case 5:
            setTimeout(() => {
              vm.setStep(6)
            }, 4000)
            break
          case 6:
            // eyes see
            if (vm.player[vm.identify.indexOf(3)] === '') {
              setTimeout(() => {
                vm.setStep(7)
              }, 4000)
            }
            break
          case 7:
            setTimeout(() => {
              let obj = {
                value: 99
              }
              vm.setStep(0)
              vm.setNight(false)
              vm.setVote(obj)
              vm.decided = false
            }, 3000)
            break
        }
      } else {
        let obj = {
              value: 99
            }
        switch (val) {
          case 99:
            setTimeout(() => {
              vm.setNight(true)
              vm.setStep(0)
            }, 4000)
            break
          case 0:
            // 第一夜
            if (vm.killed.length > 0) { // 有人死 有遺言
              setTimeout(() => {
                vm.setStep(1)
              }, 3000)
            } else { // 平安夜
              setTimeout(() => {
                vm.setStep(2)
              }, 3000)
            }
            break
          case 1:
            break
          case 2:
            if (vm.player[0] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 3:
            if (vm.player[1] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 4:
            if (vm.player[2] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 5:
            if (vm.player[3] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 6:
            if (vm.player[4] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 7:
            if (vm.player[5] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 8:
            if (vm.player[6] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 9:
            if (vm.player[7] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 10:
            if (vm.player[8] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 11:
            if (vm.player[9] === '') {
              vm.setStep(vm.step + 1)
            }
            break
          case 12: // vote
            break
          case 20: // even
            setTimeout(() => {
              vm.setStep(40)
            }, 3000)
            break
          case 21: // talk
            break
          case 22: // 投票 15s
            break
          case 23: // die & last word
            break
          case 24: // even too, night
            setTimeout(() => {
              vm.setNight(true)
              vm.setStep(0)
              vm.setVote(obj)
              vm.setKilled(99)
              vm.setNightCount()
              vm.even = 0
            }, 3000)
            break
          case 25:
            setTimeout(() => {
              vm.setNight(true)
              vm.setStep(0)
              vm.setVote(obj)
              vm.setKilled(99)
              vm.setNightCount()
              vm.even = 0
            }, 3000)
            break
          case 40: // even, talk first
          case 41: // second ...
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 48:
          case 49:
            if (vm.killed.length === vm.step - 40) {
              vm.setStep(12)
            }
            break
        }
      }
    },
    nightCount (val) {
      switch (val) {
        case 0:
          this.nightCountSpan = '一'
          break
        case 1:
          this.nightCountSpan = '二'
          break
        case 2:
          this.nightCountSpan = '三'
          break
        case 3:
          this.nightCountSpan = '四'
          break
        case 4:
          this.nightCountSpan = '五'
          break
        case 5:
          this.nightCountSpan = '六'
          break
      }
    }
    // P1listenVote (val) {
    //   if (this.player[0] === this.loginName) {

    //   }
    // }
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
      let obj = {
        value: 99
      }
      vm.setNight(true)
      vm.setNightCount(0)
      vm.setStep(0)
      vm.setVote(obj)
      vm.setKilled(99)
    })

  },
  methods: {
    ...mapActions(['setLogout', 'getData', 'setGameOver', 'setVote', 'setStep', 'setNightCount', 'setKilled', 'setNight', 'setDieOut']),
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
        vm.nightCount = res.nightCount

        console.log('username', this.memberList)
        console.log('online : ', this.online)
        console.log('player : ', this.player)
        console.log('id : ', this.identify)
        console.log('vote : ', this.voteRes)
        console.log('killed', this.killed)
        console.log('step', this.step)
        console.log('night', this.night)
        console.log('night', this.nightCount)
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
          let wolfCount = 0
          for (let j = 0; j < vm.player.length; j++) {
            if (vm.player[j] !== '' && vm.identify[vm.player[j]] === 5) {
              wolf
            }
          }
          if (killedList.length === 3) { // 3人都投才進行
            let result = vm.ana(killedList)
            if (result.length === 1) { // 多數決
              vm.setKilled(result[0])
            } else { // 平票，3取一殺
              vm.setKilled(vm.shuffle(result)[0]) // 洗牌後 殺第一個
            }
            vm.setStep(2)
          }
        }, 1100)
      } else { // morning
        if (i === 99) { // not vote
          this.decided = true
        } else {
          let obj = {
            player: this.player.indexOf(vm.loginName),
            value: i - 1
          }
          this.setVote(obj)
          this.decided = true

          setTimeout(() => { // 等15s

            let killedList = vm.ana(vm.voteRes)

            if (killedList.length === 1) { // 最高票
              vm.setKilled(killedList[0])
              vm.setStep(23)
            } else if (killedList.length > 1) { // 平票 step20
              if (vm.even === 0) { // 第一次平票 再辯論
                vm.setStep(20)
                vm.even = 1
              } else { // 第二次平票 進夜晚
                vm.setStep(24)
              }
            } else { // nobody vote
              vm.setStep(25)
            }
          }, 10000)
        }
      }
    },
    save() {
      this.setKilled(99)
      this.setStep(5)
    },
    poisonFadein () {
      $('.poison-btn').fadeIn(500)
      // this.setStep(5)
    },
    poison (player) {
      this.setKilled(player)
      this.setStep(5)
    },
    noSaveOrPoison () {
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
    nextstep () {
      // should check die or not
      switch (this.step) {
        case 1: // morning last word
          if (this.killed.length > 1) {
            if (this.firstlastword) {
              this.setDieOut(this.killed[0])
              this.setKilled(1) // shift
              this.firstlastword = false
            } else {
              this.setDieOut(this.killed[0])
              this.firstlastword = true
              this.setStep(2)
              this.setKilled(99)
            }
          } else { // die one person
            this.setDieOut(this.killed[0])
            this.setKilled(99)
            this.setStep(2)
          }
          break
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          this.setStep(this.step + 1)
          break

      }
    },
    talknextstep () {
      this.setStep(this.step + 1)
    },
    lastword () {
      // die
      let obj = {
        value : 99
      }
      this.setDieOut(this.player[this.Killed[0]])
      this.even = 0
      this.setVote(obj)
      this.setKilled(99)
      this.setNightCount()
      this.setNight(true)
      this.setStep(0)
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
    sortKilled (arr) {
      arr.sort(function(a, b) {
        return a - b;
      })
    },
    ana (arr) { // 投票計算
      let newArr = []
      let unique = []
      for (let i of arr) {
        i = JSON.stringify(i);
        //如果已有数值相同的元素存在
        if (unique.includes(i)) {
          newArr[unique.indexOf(i)].push(i)
        } else {
          let arr = []
          arr.push(i)
          unique.push(i)
          newArr.push(arr)
        }
      }
      return this.re(newArr)
    },
    re (arr) { // 投票計算
      let maxCount = 0
      let thisChar = []
      for (let i of arr) {
        if (i.length >= maxCount) {
          maxCount = i.length
        }
      }
      for (let i of arr) {
        if (i.length === maxCount) {
          thisChar.push(JSON.parse(i[0]))
        }
      }
      return thisChar
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
    window.clearInterval(this.timer)
  }
}
</script>
