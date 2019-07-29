<template>
  <div class="whokills">
    <div class="topdiv">
      <h1>狼人殺</h1>
      <div class="joinMemberList">
        <h3>觀戰人員列表</h3>
        <ul v-if="memberList.length > 0">
          <li v-for="(member, index) in memberList" :key="index">{{member}}</li>

        </ul>
      </div>
      <button @click="goMemberList()">觀戰</button>
    </div>
    <div class="row1">
      <div class="memberSeat">3</div>
      <div class="memberSeat">4</div>
      <div class="memberSeat">5</div>
      <div class="memberSeat">6</div>
      <div class="memberSeat">7</div>
      <div class="memberSeat floatright">8</div>
    </div>
    <div class="row2">
      <div class="memberSeat ">2</div>
      <div class="memberSeat floatright">9</div>
    </div>
    <div class="row3">
      <div class="memberSeat">1</div>
      <button class="mid"><span>開始遊戲</span></button>
      <div class="memberSeat floatright">10</div>
    </div>
    <!-- <div class="chatArea">
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      playerNumber: 0,
      memberList: [],
      // onLine: navigator.onLine,
    }
  },
  computed: {
    ...mapGetters(['userName', 'ip', 'identify', 'playGame', 'number', 'online']),
  },

  mounted () {
    var vm = this




    vm.bus.$off('playerNumber')
    vm.bus.$on('playerNumber', function (val) {
      vm.playerNumber = val
    })

    setInterval(function() {
      vm.memberList = vm.userName
      console.log(vm.userName)
      console.log('online : ' + vm.online)
    }, 1000)

    // window.addEventListener('offline', function(){
    //   // 网络由正常常到异常时触发
    //   vm.setLogout(vm.playerNumber)
    // })
    // window.addEventListener('online',  this.updateOnlineStatus)
    // window.addEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    ...mapActions(['setIp', 'setUserName', 'setPlayGame','setNumber', 'setLogout']),
    sit (number) {

    },
    goMemberList () {

    },
    // updateOnlineStatus(e) {
    // 	const { type } = e
    //   this.onLine = type === 'online'

    //   if (!this.onLine) {
    //     vm.setLogout(vm.playerNumber)
    //   }
    // }
  },
  // beforeDestroy () {
  //   window.removeEventListener('online',  this.updateOnlineStatus)
  //   window.removeEventListener('offline', this.updateOnlineStatus)
  // },
  destroyed () {
    this.setLogout(this.playerNumber)
    console.log('online : ' + this.online)
  }
}
</script>



<style scoped>

</style>
