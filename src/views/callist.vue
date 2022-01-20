<template>
  <div>
    <div v-if="step === 1">
      <div class="header header-color">
        <h2>功能選取</h2>
      </div>
      <div class="list">
        <ul>
          <li @click="changeSelect(0)"><router-link :to="{ path: '/calculator'}"><div><img class="icon" src="@/assets/images/member/icon1.svg"><span>計算機</span></div></router-link></li>
          <li @click="changeSelect(10)"><img class="icon" src="@/assets/images/member/icon2.svg"><span>換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="changeSelect(9)"><router-link :to="{ path: '/todo'}"><div><img class="icon" src="@/assets/images/member/icon2.svg"><span>todo</span></div></router-link></li>
          <li @click="changeSelect(11)"><router-link :to="{ path: '/login'}"><div><img class="icon" src="@/assets/images/member/icon2.svg"><span>狼人殺</span></div></router-link></li>
        </ul>
      </div>
    </div>
    <div v-if="step === 2">
      <div class="header header-color">
        <h2>換算選取</h2>
        <div class="backtolist" @click="goback()">取消</div>
      </div>
      <div class="list">
        <ul>
          <li @click="funcSelect(1)"><img class="icon" src="@/assets/images/member/icon2.svg"><span>匯率換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(2)"><img class="icon" src="@/assets/images/member/icon3.svg"><span>長度換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(3)"><img class="icon" src="@/assets/images/member/icon4.svg"><span>面積換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(4)"><img class="icon" src="@/assets/images/member/icon5.svg"><span>速度換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(5)"><img class="icon" src="@/assets/images/member/icon6.svg"><span>重量換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(6)"><img class="icon" src="@/assets/images/member/icon7.svg"><span>溫度換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(7)"><img class="icon" src="@/assets/images/member/icon8.png"><span>功率換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>
          <li @click="funcSelect(8)"><img class="icon" src="@/assets/images/member/icon1.svg"><span>壓強換算</span><img v-if="false" src="@/assets/images/payway/icon002.png"></li>

        </ul>
      </div>
    </div>
    <div class="countType" v-if="step === 3">
      <div class="header header-color">
        <h2>{{functionName}}</h2>
        <div class="backtolist" @click="goback()">取消</div>
      </div>
      <div class="topbox">
        <rate v-if="select === 1" ref="ra"></rate>
        <length v-if="select === 2" ref="le"></length>
        <ar v-if="select === 3" ref="ar"> </ar>
        <speed v-if="select === 4" ref="sp"></speed>
        <weight v-if="select === 5" ref="we"></weight>
        <temp v-if="select === 6" ref="te"></temp>
        <power v-if="select === 7" ref="po"></power>
        <press v-if="select === 8" ref="pr"></press>
      </div>
      <div class="numberbox">
        <table class="numbertable">
          <tbody>
            <tr>
              <td @click="clickNum('7')">7</td>
              <td @click="clickNum('8')">8</td>
              <td @click="clickNum('9')">9</td>
              <td rowspan="2" style="color: rgb(255, 153, 0)" @click="clear()">AC</td>
            </tr>
            <tr>
              <td @click="clickNum('4')">4</td>
              <td @click="clickNum('5')">5</td>
              <td @click="clickNum('6')">6</td>
            </tr>
            <tr>
              <td @click="clickNum('1')">1</td>
              <td @click="clickNum('2')">2</td>
              <td @click="clickNum('3')">3</td>
              <td rowspan="2" @click="back()">X</td>
            </tr>
            <tr>
              <td colspan="2" @click="clickNum('0')">0</td>
              <td @click="dot()">.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import rate from '@/components/calculator/exchangeRate'
import length from '@/components/calculator/length'
import ar from '@/components/calculator/area'
import speed from '@/components/calculator/speed'
import weight from '@/components/calculator/weight'
import temp from '@/components/calculator/temperature'
import power from '@/components/calculator/power'
import press from '@/components/calculator/press'

export default {
  data () {
    return {
      step: 1,
      select: 99,
      functionName: '',
      funtionNameList: ['計算機', '匯率轉換', '長度換算', '面積換算', '速度換算', '重量換算', '溫度換算', '功率換算', '壓強換算', 'todo']
    }
  },
  components: {
    rate,
    length,
    ar,
    speed,
    weight,
    temp,
    power,
    press
  },
  mounted () {
  },
  methods: {
    goback () {
      this.step--
    },
    changeSelect (val) {
      if (val === 10) {
        this.step = 2
      } else {
        // this.select = val
      }
    },
    funcSelect (val) {
      this.functionName = this.funtionNameList[val]
      this.select = val
      this.step = 3
    },
    clickNum (val) {
      if (this.$refs.ra !== undefined) { this.$refs.ra.clickNumber(val) }
      if (this.$refs.le !== undefined) { this.$refs.le.clickNumber(val) }
      if (this.$refs.ar !== undefined) { this.$refs.ar.clickNumber(val) }
      if (this.$refs.sp !== undefined) { this.$refs.sp.clickNumber(val) }
      if (this.$refs.we !== undefined) { this.$refs.we.clickNumber(val) }
      if (this.$refs.te !== undefined) { this.$refs.te.clickNumber(val) }
      if (this.$refs.po !== undefined) { this.$refs.po.clickNumber(val) }
      if (this.$refs.pr !== undefined) { this.$refs.pr.clickNumber(val) }
    },
    dot () {
      if (this.$refs.ra !== undefined) { this.$refs.ra.clickDot() }
      if (this.$refs.le !== undefined) { this.$refs.le.clickDot() }
      if (this.$refs.ar !== undefined) { this.$refs.ar.clickDot() }
      if (this.$refs.sp !== undefined) { this.$refs.sp.clickDot() }
      if (this.$refs.we !== undefined) { this.$refs.we.clickDot() }
      if (this.$refs.te !== undefined) { this.$refs.te.clickDot() }
      if (this.$refs.po !== undefined) { this.$refs.po.clickDot() }
      if (this.$refs.pr !== undefined) { this.$refs.pr.clickDot() }
    },
    clear () {
      if (this.$refs.ra !== undefined) { this.$refs.ra.clickClear() }
      if (this.$refs.le !== undefined) { this.$refs.le.clickClear() }
      if (this.$refs.ar !== undefined) { this.$refs.ar.clickClear() }
      if (this.$refs.sp !== undefined) { this.$refs.sp.clickClear() }
      if (this.$refs.we !== undefined) { this.$refs.we.clickClear() }
      if (this.$refs.te !== undefined) { this.$refs.te.clickClear() }
      if (this.$refs.po !== undefined) { this.$refs.po.clickClear() }
      if (this.$refs.pr !== undefined) { this.$refs.pr.clickClear() }
    },
    back () {
      if (this.$refs.ra !== undefined) { this.$refs.ra.clickBack() }
      if (this.$refs.le !== undefined) { this.$refs.le.clickBack() }
      if (this.$refs.ar !== undefined) { this.$refs.ar.clickBack() }
      if (this.$refs.sp !== undefined) { this.$refs.sp.clickBack() }
      if (this.$refs.we !== undefined) { this.$refs.we.clickBack() }
      if (this.$refs.te !== undefined) { this.$refs.te.clickBack() }
      if (this.$refs.po !== undefined) { this.$refs.po.clickBack() }
      if (this.$refs.pr !== undefined) { this.$refs.pr.clickBack() }
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
}
.header-color {
  background-color: rgb(19, 19, 19);
  position: relative;
}
.header div.backtolist {
  position: absolute;
  right: 3vw;
  top: 4vw;
  color: rgb(255, 153, 0)
}

.list ul li {
  position: relative;
  padding: 6vw 0 0 7vw;
  border-top: 0.3vw solid rgb(17, 17, 17);
  height: 14vw;
}
.list ul li span {
  color: white
}
.list ul li img.icon {
  width: 5vw;
  height: 5vw;
  position: relative;
  margin-right: 2vw;
  vertical-align: middle;
}
.list ul li span {
  vertical-align: middle;
}
.topbox {
  height: 87vw;
  background-color: black;
  color: white
}
.numberbox {
  position: relative;
  height: 119vw;;
  background-color: rgb(10, 10, 10);
  color: white;
  padding-top: 5vw;
  text-align: center;
}
.numbertable {
  margin-right: auto;
  margin-left: auto;
  border-collapse: separate;
  border-spacing: 2vw 4vw;
}
.numberbox td {
  width: 21vw;
  height: 21vw;
  background-color: rgb(19, 19, 19);
  border-radius: 10vw;
  vertical-align: middle;
  font-size: 7vw;
}
table tr td:active{
  background-color: rgb(51, 51, 51)
}
</style>
