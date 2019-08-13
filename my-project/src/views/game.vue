<template>
  <div class="game-bg">
    <div class="top">
      <div>
        <button @click="gameOver()">結束遊戲</button>
      </div>
      <div class="word">
        <span>請確認自己的身分...</span>
      </div>
      <div class="identify" v-if="players.includes(loginName)">
        <div class="card-front"></div>
        <div class="card-back">
          <img v-if="identify.length > 0" :src="'/static/image/whokills/id' + identify[players.indexOf(loginName)] + '.jpg'"/>
        </div>
      </div>
    </div>
    <div class="play" v-if="player.length > 0">
      <ul>
        <li v-for="(play, index) in players" :key="index" @click="vote()">
          <div>
            <span>{{index + 1}}</span><p>{{play}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="pass-bt">
      <button>結束發言</button>
    </div>
    <div class="night">
      <div class="wolfvote" v-if="player.indexOf(loginName) === 5">

      </div>
      <div class="witch" v-if="player.indexOf(loginName) === 2"></div>
      <div class="eyes" v-if="player.indexOf(loginName) === 3"></div>
      <div></div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'
import { setTimeout } from 'timers';

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
      night: false
    }
  },
  watch: {
    gameStart (val) {
      let vm = this
      if (!val) {
        vm.gameOver()
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
    }, 300)
    setTimeout(() => {
      if (this.players.length > 0) {
        $('.player ul li:nth-child(1)').fadeIn(300, () => {
          $('.player ul li:nth-child(2)').fadeIn(300, () => {
            $('.player ul li:nth-child(3)').fadeIn(300, () => {
              $('.player ul li:nth-child(4)').fadeIn(300, () => {
                $('.player ul li:nth-child(5)').fadeIn(300, () => {
                  $('.player ul li:nth-child(6)').fadeIn(300, () => {
                    $('.player ul li:nth-child(7)').fadeIn(300, () => {
                      $('.player ul li:nth-child(8)').fadeIn(300, () => {
                        $('.player ul li:nth-child(9)').fadeIn(300, () => {
                          $('.player ul li:nth-child(10)').fadeIn(300, () => {
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      }
    }, 300)

  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setLogout', 'getData', 'setIdentify', 'setGameOver']),
    getdata (data) {
      var vm = this

      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.player = res.player
        vm.online = res.userName.length
        vm.identify = res.identify
        vm.gameStart = res.gameStart

        console.log('username', this.memberList)
        console.log('online : ', this.online)
        console.log('player : ', this.player)
        console.log('id : ', this.identify)
      })
    },
    vote () {
      if (this.night) {

      }
    },
    gameOver () {
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


<style scoped>
  .game-bg {
    display: none;
    height: -webkit-fill-available;
    width: 100%;
    background-image: url('../assets/images/background.jpg');
    background-repeat: no-repeat;
    /* background-size: cover; */
    background-size: 100% 100%;
  }
  .top {
    height: 33vw;
    width: 100%;
    text-align: center;
  }
  .top .word {
    position: absolute;
    border-radius: 1vw;
    font-size: 57px;
    top: 13vw;
    left:29vw;
    color: aliceblue;
    width: 500px;
    height: 10vw;
    vertical-align: middle
  }
  .top .identify {
    float: right;
    border-radius: 1vw;
    width: 151px;
    height: 242px;
    margin: 25px 25px 0vw 0vw;
    transform-style:preserve-3d;
    transition:0.5s all ease;
    box-shadow:0px 0px 10px rgba(10,10,0.8);
  }
  .top .identify:hover {
  transform:rotateY(180deg);
  }
  .top .identify .card-front {
    position:absolute;
    /* background-image: url('../assets/images/whokills/people.jpg'); */
    background-image: url('../assets/images/whokills/cardBack.jpg');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    border-radius: 1vw;
    backface-visibility:hidden;
  }
  .top .identify .card-back {
    position:absolute;
    /* background-image: url('../assets/images/whokills/cardBack.jpg'); */
    /* background-image: url('../assets/images/whokills/1.jpg'); */
    width: 100%;
    height: 100%;

    backface-visibility:hidden;
    transform:rotateY(180deg);
  }
  .top .identify .card-back img{
    width: 100%;
    height: 100%;
    border-radius: 1vw;
  }
  .player {
    width: 100%;
  }
  .player ul li {
    display: none;
    position: absolute;
    bottom: 10px;
    width:9%;
    height: 135px;
    border-top-left-radius: 4vw;
    border-top-right-radius: 4vw;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
    background-image: linear-gradient(57deg,#030011,#010046 51%,#966100);
    /* transform:scale(1,1); */
    transition: all .3s cubic-bezier(0.39, 0.58, 0.57, 1);
    box-shadow:0px 0px 10px rgba(10,10,0.8);
  }
  .player ul li:hover {
    transform:scale(1.15,1.15);
    z-index: 7
  }
  .player ul li div{
    width: 100%;
    /* text-align: center; */
    color: rgb(255, 235, 205);
    height: 100%;
    padding-top: 3vw;
    font-weight: 700
  }
  .player ul li div span{
    position: absolute;

    top: -1.5vw;
    margin: 0vw auto;
  }
  .player ul li div p{
    position: inherit;
    width: fit-content;
    margin: 0vw auto;
    bottom: 0vw;
  }
  .player ul :last-child {
    right:5vw;
    z-index: 5;
    bottom: 5vw
  }
  .player ul :nth-child(1) {
    left:5vw;
    z-index: 5;
    bottom: 5vw
  }
  .player ul :nth-child(2) {
    left: 12vw;;
    bottom: 10vw;
    z-index: 4
  }
  .player ul :nth-child(3) {
    left: 21vw;
    bottom: 13vw
  }
  .player ul :nth-child(4) {
    left: 31vw;
    bottom: 15vw

  }
  .player ul :nth-child(5) {
    left: 41vw;
    bottom: 17vw
  }
  .player ul :nth-child(6) {
    left: 52vw;
    bottom: 17vw
  }
  .player ul :nth-child(7) {
    left: 62vw;
    bottom: 15vw
  }
  .player ul :nth-child(8) {
    left: 72vw;
    bottom: 13vw
  }
  .player ul :nth-child(9) {
    left: 80vw;
    bottom: 10vw
  }
  .pass-bt {
    position: absolute;
    bottom: 5vw;
    left: 45vw
  }
  .pass-bt button {
    height: auto;
    font-size: 3vw;
    background: #08002e
  }
  .night {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgb(0, 0, 0, .7)
  }
</style>
