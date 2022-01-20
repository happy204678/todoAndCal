<template>
  <div class="length">
    <ul>
      <li>
        <span class="name">台幣KRW ></span>
        <span class="input focusm selected" @click="focustop()">{{topnum}}</span>
      </li>
      <li>
        <span class="name">人民幣CNY ></span>
        <span class="input focusmi" @click="focusbtm()">{{btmnum}}</span>
      </li>
    </ul>
    <!-- <div class="update">
      <span>資料來自於微牛，</span><span>{{updateTime}}</span><span>更新</span>
    </div> -->
  </div>
</template>

<script>
import $ from 'jquery'
// import moment from 'moment'

export default {

  data () {
    return {
      topnum: '1',
      btmnum: '0.2213',
      selectTop: true
      // updateTime: ''
    }
  },
  watch: {
    topnum (val) {
      if (val.length < 1) {
        this.topnum = '0'
      } else if (val.length >= 15) {
        this.topnum = this.topnum.substring(0, 15)
      }
    },
    btmnum (val) {
      if (val.length < 1) {
        this.btmnum = '0'
      } else if (val.length >= 14) {
        this.btmnum = this.btmnum.substring(0, 14)
      }
    }
  },
  // mounted () {
  //   var date = new Date()
  //   this.updateTime = moment(date).format('YYYY/MM/DD HH:mm:ss')
  // },
  methods: {
    focustop () {
      $('.input').removeClass('selected')
      $('.focusm').addClass('selected')
      this.selectTop = true
    },
    focusbtm () {
      $('.input').removeClass('selected')
      $('.focusmi').addClass('selected')
      this.selectTop = false
    },
    clickNumber (val) {
      if (this.selectTop) {
        console.log('top')
        if (this.topnum === '0') {
          this.topnum = val
        } else {
          this.topnum += val
        }
        this.turnbtm(this.topnum)
      } else {
        console.log('bottom')
        if (this.btmnum === '0') {
          this.btmnum = val
        } else {
          this.btmnum += val
        }
        this.turntop(this.btmnum)
      }
    },
    clickDot () {
      console.log('.')
      if (this.selectTop) {
        if (this.topnum.indexOf('.') === -1) {
          this.topnum += '.'
        }
      } else {
        if (this.btmnum.indexOf('.') === -1) {
          this.btmnum += '.'
        }
      }
    },
    clickBack () {
      if (this.selectTop) {
        this.topnum = this.topnum.substring(0, this.topnum.length - 1)
        this.turnbtm(this.topnum)
      } else {
        this.btmnum = this.btmnum.substring(0, this.btmnum.length - 1)
        this.turntop(this.btmnum)
      }
    },
    clickClear () {
      console.log('clear')
      this.topnum = '0'
      this.btmnum = '0'
    },
    turnbtm (top) {
      this.btmnum = (Number(top) * 0.0006214).toString()
    },
    turntop (btm) {
      this.topnum = (Number(btm) / 0.2213).toString()
    },
    goBack (val) {
      this.$router.push({ path: '/member/callist' })
    }
  }
}
</script>

<style scoped>
.length {
  position: absolute;
  width: 100%;
  height: 86vw;
}
div ul li {
  margin-top: 11vw;
  width: 100%;
  height: 12vw;
}
div ul li span.name {
  font-size: 4.5vw;
  vertical-align: sub;
  margin-left: 3vw;
}
.input{
  background-color: black;
  color: white;
  border: none;
  float: right;
  text-align: right;
  margin-right: 3vw;
  font-size: 8vw;
  width: 65%;
}
.selected {
  color: rgb(255, 153, 0)
}
.update {
  position: absolute;
  bottom: 0vw;
  width: 100%;
  text-align: center;
  font-size: 4vw;
  color: rgb(97, 97, 97);
}

</style>
