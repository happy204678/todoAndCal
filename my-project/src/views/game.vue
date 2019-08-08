<template>
  <div class="game-bg">
    <div class="top">
      <div>
        <button @click="gameOver()">結束遊戲</button>
      </div>
      <div class="word" style="display:none">
        <span>123</span>
      </div>
      <div class="identify">
        <div class="card-front"></div>
        <div class="card-back"></div>
      </div>
    </div>
    <div class="player">
      <ul>
        <li><div><span>1</span><p>{{loginName}}</p></div></li>
        <li><div><span>2</span><p></p></div></li>
        <li><div><span>3</span><p></p></div></li>
        <li><div><span>4</span><p></p></div></li>
        <li><div><span>5</span><p></p></div></li>
        <li><div><span>6</span><p></p></div></li>
        <li><div><span>7</span><p></p></div></li>
        <li><div><span>8</span><p></p></div></li>
        <li><div><span>9</span><p></p></div></li>
        <li><div><span>10</span><p></p></div></li>
      </ul>
    </div>
    <div class="pass-bt">
      <button>結束發言</button>
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
      online: 0,
      timer: '',
      randomSort: [],
      gameModelOG: [1, 1, 1, 2, 3, 4, 5, 5, 5]
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

    this.timer = setInterval(function () {
      vm.getdata()
    }, 300)

    window.onunload = function (e) { // close page
      vm.closePage()
    }
    window.onload = (e) => { // 重整
      vm.closePage()
    }

  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame', 'setLogout', 'getData', 'setSeat', 'setIdentify', 'setGameOver']),
    getdata (data) {
      var vm = this

      this.getData().then((res) => {
        vm.memberList = res.userName
        vm.playGame = res.playGame
        vm.online = res.userName.length

        console.log('username', this.memberList)
        console.log('playgame', this.playGame)
        console.log('online : ', this.online)
        console.log('player : ', res.player)
        console.log('id : ', res.identify)
      })
    },
    gameOver () {
      this.setGameOver()
      this.closePage()
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
    background-color: #815400;
    border-radius: 1vw;
    border: 2px solid rgb(82, 49, 0);
    top: 13vw;
    left:29vw;
    color: aliceblue;
    width: 45vw;
    height: 10vw;
    box-shadow:0px 0px 10px rgba(10,10,0.8);
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
    background-image: url('../assets/images/whokills/people.jpg');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    border-radius: 1vw;
    backface-visibility:hidden;
    transform:rotateY(180deg);
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
    z-index: 6
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
  /* 15vw 7vw 2vw */
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
</style>
