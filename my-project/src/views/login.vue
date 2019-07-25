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
      permissionList: ['陳宥丞', '123', '葉佳霖', null, null, null, null, null, null, null, null], // 人名登入
      permissionKey: false,
    }
  },
  computed: {
    // ...mapGetters(['userInfo', 'businessNumber', 'AID', 'sessionID', 'totalBetList', 'hall']),
  },
  mounted () {
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
    ...mapActions(['ip', 'username', 'identify', 'playGame']),
    doLogin () {
      var vm = this
      //permission
      for (let i = 0; i < vm.permissionList.length; i++) {
        if (vm.name === vm.permissionList[i]) {
          vm.permissionKey = true
        }
      }
      //success
      if (vm.permissionKey) {
        // store ip name number
        console.log(returnCitySN["cip"], returnCitySN["cname"]) // 118.163.88.174 台湾省
        // go
        window.setTimeout(function () {
          $('.loginBody').fadeOut(2000, function () {
            vm.goWhoKills()
          })
        }, 500)
      // failure
      } else {
        vm.username = ''
        window.alert('字有錯 || 他媽給我亂打 || 你沒有權限QQ')
        return
      }
    },
    goWhoKills () {
      this.$router.push({ path: '/whokills' })
    }
  }
}
</script>
<style scoped>

</style>

