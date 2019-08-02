<template>
  <div class="length">
    <ul>
      <li>
        <span class="name">公尺/秒 m/s ></span>
        <span class="input focusm selected" @click="focustop()">{{topnum}}</span>
      </li>
      <li>
        <span class="name">光速 c ></span>
        <span class="input focusmi" @click="focusbtm()">{{btmnum}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'

export default {

  data () {
    return {
      topnum: '1',
      btmnum: '3.33559999999E-9',
      selectTop: true
    }
  },
  watch: {
    topnum (val) {
      if (val.length < 1) {
        this.topnum = '0'
      } else if (val.length >= 16) {
        this.topnum = this.topnum.substring(0, 16)
      }
    },
    btmnum (val) {
      if (val.length < 1) {
        this.btmnum = '0'
      } else if (val.length >= 16) {
        this.btmnum = this.btmnum.substring(0, 16)
      }
    }
  },
  mounted () {

  },
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
        if (this.topnum === '0') {
          this.topnum = val
        } else {
          this.topnum += val
        }
        this.turnbtm(this.topnum)
      } else {
        if (this.btmnum === '0') {
          this.btmnum = val
        } else {
          this.btmnum += val
        }
        this.turntop(this.btmnum)
      }
    },
    clickDot () {
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
      this.topnum = '0'
      this.btmnum = '0'
    },
    turnbtm (top) {
      this.btmnum = (Number(top) * 3.33559999999E-9).toString()
    },
    turntop (btm) {
      this.topnum = (Number(btm) / 3.33559999999E-9).toString()
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
}
div ul li {
  margin-top: 11vw;
  width: 100%;
  height: 12vw;
}
div ul li span.name {
  font-size: 4.4vw;
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
  font-size: 6.5vw;
  width: 65%;
}
.selected {
  color: rgb(255, 153, 0)
}

</style>
