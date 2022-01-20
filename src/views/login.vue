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

import { mapActions } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      name: '',
      permissionList: ['陳宥丞', '123', '葉佳霖', '黃均維', '毛君安', '何中淼', '蔡湘霖', '楊景光', '林禹任', '邱俊斌', 'A夢', '陳怡安', '陳宥亘', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'Kenny'], // 人名登入
      permissionKey: false,
      timer: '',
      online: 0,
      userName: ''
    }
  },
  computed: {
    // ...mapGetters(['userName', 'identify', 'online', 'player'])
  },
  mounted () {
    var vm = this
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

    this.timer = setInterval(function () {
      vm.getdata()
    }, 1000)
  },
  methods: {
    ...mapActions(['setUserName', 'getData']),
    getdata () {
      var vm = this

      this.getData().then((res) => {
        vm.userName = res.userName
        vm.online = res.userName.length
        vm.player = res.player

        console.log('username', this.userName)
        console.log('player', this.player)
        console.log('online : ', this.online)
      })
    },
    doLogin () {
      var vm = this
      // permission
      for (let i = 0; i < vm.permissionList.length; i++) {
        if (vm.name === vm.permissionList[i]) {
          vm.permissionKey = true
        }
      }
      // success & check this name is logining now
      if (vm.permissionKey && (vm.userName === undefined || !vm.userName.includes(vm.name))) {
        // store ip name number
        // console.log(returnCitySN["cip"], returnCitySN["cname"]) // 118.163.88.174 台湾省

        vm.setUserName(vm.name)
        vm.goWhoKills()
      // failure
      } else {
        this.loginFail()
      }
    },
    loginFail () {
      this.name = ''
      window.alert('字有錯 || 他媽給我亂打 || 你沒有權限QQ || 您已經登入惹')
    },
    goWhoKills () {
      var vm = this
      window.setTimeout(function () {
        $('.loginBody').fadeOut(2000, function () {
          vm.$router.push({ path: '/whokills/' + vm.name })
        })
      }, 500)
    }
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>
