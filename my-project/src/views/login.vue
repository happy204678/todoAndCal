<template>
  <div class="loginBody">
    <div class="op"></div>
    <div class="title">
      <h1>狼人殺</h1>
    </div>
    <div class="login">
      <span>輸入您的大名</span><br>
      <input type="text" v-model="username" placeholder="完整姓名唷！"><br>
      <button @click="doLogin()">開殺</button>
    </div>
  </div>
</template>

<script>

// import { mapActions, mapGetter } from '@/store'
import $ from 'jquery'

export default {
  data: {
    return: {
      username: '',
      permissionList: ['陳宥丞', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 人名登入
      permissionKey: false,
    }
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
    // ...mapActions,
    doLogin () {
      var vm = this
      //permission
      for (let i = 0; i < vm.loginPermission.length; i++) {
        if (vm.username === vm.loginPermission[i]) {
          vm.permissionKey = true
        }
      }
      //success
      if (vm.permissionKey) {
        // store ip name number

        // go
        // this.$router.push({ path: '/whokills' })
      // failure
      } else {
        vm.username = ''
        return alert('字有錯 || 他媽給我亂打 || 你沒有權限QQ')
      }
    }
  }
}
</script>
<style scoped>

</style>

