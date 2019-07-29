<template>
  <div class="loginBody">
    <div class="op"></div>
    <div class="title">
      <h1>狼人殺</h1>
    </div>
    <div class="login">
      <span>輸入您的大名</span><br>
      <input type="text" v-model="name" placeholder="完整姓名唷！">
      <button @click="doLogin()">開殺</button>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      name: '',
      permissionList: ['陳宥丞', '123', '葉佳霖','1', '2', '3', '4'], // 人名登入
      permissionKey: false,
      playerNumber: 0, // record login number
    }
  },
  computed: {
    ...mapGetters(['userName', 'ip', 'identify', 'playGame', 'number']),
  },
  mounted () {
    console.log('userName', this.userName)
    $('.title').fadeIn(0, function () {
      $('.title').animate({fontSize: '15vw'}, 100, function () {
        $('.title').animate({fontSize: '10vw'}, 500, function () {
        $('.op').animate({opacity: '0.8'}, 500)
        })
      })
    })
    window.setTimeout(function () {
      $('.login').fadeIn(2000)
    }, 900)

  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame','setNumber', 'setOnlineAdd']),
    doLogin () {
      var vm = this
      //permission
      for (let i = 0; i < vm.permissionList.length; i++) {
        if (vm.name === vm.permissionList[i]) {
          vm.permissionKey = true
        }
      }

      console.log('userName ', vm.userName)

      //success & check this name is logining now


      if (vm.userName === undefined) { // first

      }
      if (vm.permissionKey && vm.userName.indexOf(vm.name) === -1) {

        // store ip name number
        // console.log(returnCitySN["cip"], returnCitySN["cname"]) // 118.163.88.174 台湾省

        // for (let i = 0; i < vm.number.length; i++) {
        //   if (vm.number.indexOf(i) === -1) { // get number
        //     vm.playerNumber = i
        //   }
        // }

        vm.sendbus(vm.playerNumber)
        // vm.setNumber(vm.playerNumber)
        vm.setUserName(vm.name)


        // go
        window.setTimeout(function () {
          $('.loginBody').fadeOut(2000, function () {
            vm.goWhoKills()
          })
        }, 500)
      // failure
      } else {
        this.loginFail()
      }
    },
    loginFail () {
      this.name = ''
      window.alert('字有錯 || 他媽給我亂打 || 你沒有權限QQ || 您已經登入惹')
      return
    },
    sendbus (val) {
      this.bus.$emit('playerNumber', val)
    },
    goWhoKills () {
      this.$router.push({ path: '/whokills' })
    }
  }
}
</script>
<style scoped>

</style>

