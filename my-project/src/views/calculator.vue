<template>
  <div>
    <div class="header header-color">
      <h2>計算機</h2>
      <div class="backtolist" @click="goBack()">取消</div>
    </div>
    <div class="content">
      <div class="topbox" >
        <div class="rightbottom">
          <span class="record">{{record}}</span>
          <span class="result">{{neg1}}{{num1}}{{operator}}{{neg2}}{{num2}}</span>
        </div>
      </div>
      <div class="numberbox">

        <div class="keyboard">
          <ul>
            <li @click="clean('c')"><span>C</span></li>
            <li @click="negtive()"><span>+-</span></li>
            <li class="delete" @click="back()"><span></span></li>
            <li @click="operatorbtn('/')"><span>/</span></li>
            <li @click="number('7')"><span>7</span></li>
            <li @click="number('8')"><span >8</span></li>
            <li @click="number('9')"><span>9</span></li>
            <li @click="operatorbtn('*')" style="transform: rotate(45deg);"><span>+</span></li>
            <li @click="number('4')"><span>4</span></li>
            <li @click="number('5')"><span>5</span></li>
            <li @click="number('6')"><span>6</span></li>
            <li @click="operatorbtn('-')"><span>-</span></li>
            <li @click="number('1')"><span>1</span></li>
            <li @click="number('2')"><span>2</span></li>
            <li @click="number('3')"><span>3</span></li>
            <li @click="operatorbtn('+')"><span>+</span></li>
            <li class="zero" @click="number('0')"><span>0</span></li>
            <li @click="dot('.')"><span>.</span></li>
            <li @click="equal()"><span>=</span></li>
          </ul>
        </div>
      </div>
      <div class="log">
        <div class="logcontent">
          <ul>
            <li v-for="(log, $idx) in logarr" :key="$idx">
              <span>{{log[0]}}</span><br>
              <span>{{log[1]}}</span>
            </li>
          </ul>
        </div>
        <div class="action">
          <ul>
            <li><span>繼續計算</span></li>
            <li class="clearlog"><span>清除紀錄</span></li>
          </ul>
        </div>
    </div>
    </div>
  </div>
</template>
<script>

import $ from 'jquery'

export default {
  data () {
    return {
      record: '',
      neg1: '',
      neg2: '',
      num1: '0',
      num2: '',
      operator: '',
      result: '',
      logarr: [],
      check: ''
    }
  },
  watch: {
    num1 () {
      let countlength = this.neg1.length + this.num1 + this.operator + this.neg2 + this.num2
      if (countlength.length >= 9) {
        $('span.result').addClass('over')
      } else {
        $('span.result').removeClass('over')
      }
    },
    record () {
      if (this.record.length >= 9) {
        $('span.record').addClass('overrecord')
      } else {
        $('span.record').removeClass('overrecord')
      }
    }
  },
  mounted () {
    let vm = this
    $(document).ready(function () {
      $('.slide').click(function () {
        $('.numberbox').slideUp() // css('display','none')
        $('.slide').css('display', 'none')
      })
      $('.action ul li').click(function () {
        $('.numberbox').slideDown() // css('display','block')
        $('.slide').css('display', 'block')
        if (this.className === 'clearlog') {
          vm.logarr = []
        }
      })
    })
  },
  methods: {
    dot (val) {
      var vm = this
      if (vm.operator === '' && vm.num1.indexOf('.') === -1) {
        vm.num1 += val
      } else if (vm.operator !== '' && vm.num2.indexOf('.') === -1) {
        if (vm.num2.length > 0) {
          vm.num2 += val
        }
      }
    },
    back () {
      var vm = this
      if (vm.num1.indexOf('=') === 0) {
        vm.num1 = '0'
        vm.record = ''
      }
      if (vm.num2.length !== 0) {
        vm.num2 = vm.num2.substring(0, vm.num2.length - 1)
      } else if (vm.neg2.length !== 0) {
        vm.neg2 = ''
      } else if (vm.operator.length !== 0) {
        vm.operator = ''
      } else if ((vm.neg1.length + vm.num1.length) === 1) {
        vm.num1 = '0'
      } else if (vm.num1.length !== 0) {
        vm.num1 = vm.num1.substring(0, vm.num1.length - 1)
      } else if (vm.neg1.length !== 0) {
        vm.neg1 = ''
      }
    },
    number (val) {
      var vm = this
      if (vm.operator === '') { // press number
        if (vm.num1 === '0' || vm.num1.indexOf('=') === 0) { // after Clear
          vm.record = ''
          vm.num1 = val
        } else {
          vm.num1 += val
          if (Number(vm.num1) >= 999999999999) {
            vm.num1 = '999999999999'
          }
        }
      } else if (vm.operator !== '') { // num2
        if (vm.num2 === '') {
          vm.num2 = val
        } else { // num1
          vm.num2 += val
          if (Number(vm.num2) >= 999999999999) {
            vm.num2 = '999999999999'
          }
        }
      }
    },
    operatorbtn (val) {
      var vm = this
      if (val === '*') {
        if (vm.num1.indexOf('=') === 0) { // already = ,have result
          vm.record = ''
          vm.operator = '*'
          vm.num1 = vm.num1.substring(1, vm.num1.length)
        } else if (vm.operator.length > 0) { // 連續運算
          vm.count()
          vm.record = ''
          vm.num2 = ''
          vm.neg2 = ''
          vm.operator = '*'
        } else { // num1打數字時就確定
          vm.operator = '*'
        }
      } else if (val === '/') {
        if (vm.num1.indexOf('=') === 0) { // already = ,have result
          vm.record = ''
          vm.operator = '/'
          vm.num1 = vm.num1.substring(1, vm.num1.length)
        } else if (vm.operator.length > 0) {
          vm.count()
          vm.record = ''
          vm.num2 = ''
          vm.neg2 = ''
          vm.operator = '/'
        } else { // num1打數字時就確定
          vm.operator = '/'
        }
      } else if (val === '-') {
        if (vm.num1.indexOf('=') === 0) { // already = ,have result
          vm.record = ''
          vm.operator = '-'
          vm.num1 = vm.num1.substring(1, vm.num1.length)
        } else if (vm.operator.length > 0) {
          vm.count()
          vm.record = ''
          vm.num2 = ''
          vm.neg2 = ''
          vm.operator = '-'
        } else { // num1打數字時就確定
          vm.operator = '-'
        }
      } else if (val === '+') {
        if (vm.num1.indexOf('=') === 0) { // already = ,have result
          vm.record = ''
          vm.operator = '+'
          vm.num1 = vm.num1.substring(1, vm.num1.length)
        } else if (vm.operator.length > 0) {
          vm.count()
          vm.record = ''
          vm.num2 = ''
          vm.neg2 = ''
          vm.operator = '+'
        } else { // num1打數字時就確定
          vm.operator = '+'
        }
      }
    },
    equal () {
      var vm = this
      vm.num1 = vm.num1.toString()
      if (vm.num1.length === 0 || vm.num2.length === 0 || vm.num1.indexOf('=') === 0) {
        // do nothing
      } else {
        if (Number(vm.num1) < 0) {
          vm.num = vm.num.substring(1, vm.num.length)
          vm.neg1 = '-'
        } else {
          vm.neg1 = ''
        }
        vm.count()
        vm.num1 = '=' + vm.num1
        vm.operator = ''
        vm.num2 = ''
        vm.neg2 = ''
      }
    },
    count (val) {
      let vm = this
      switch (vm.operator) {
        case '*':
          vm.result = Number(vm.neg1 + vm.num1) * Number(vm.neg2 + vm.num2)
          break
        case '/':
          vm.result = Number(vm.neg1 + vm.num1) / Number(vm.neg2 + vm.num2)
          break
        case '-':
          vm.result = Number(vm.neg1 + vm.num1) - Number(vm.neg2 + vm.num2)
          break
        case '+':
          vm.result = Number(vm.neg1 + vm.num1) + Number(vm.neg2 + vm.num2)
          break
      }
      vm.record = vm.neg1 + vm.num1 + vm.operator + vm.neg2 + vm.num2
      if (vm.result - Math.floor(vm.result) > 0) { // 如果有四捨五入到小數第二位
        vm.num1 = vm.result.toFixed(2).toString()
      } else { // 否則輸出到個位
        vm.num1 = Math.floor(vm.result).toString()
      }
      if (vm.result >= 999999999999) {
        vm.result = 999999999999
        vm.num1 = vm.result
      }
      vm.pushlog()
    },
    pushlog () {
      let recordlog = this.record
      let recordnum1
      let vm = this
      console.log(vm.num1)
      recordnum1 = vm.num1.toString().indexOf('=') === 0 ? vm.num1 : '=' + vm.num1
      this.logarr.unshift([recordlog, recordnum1])
      if (vm.logarr.length > 5) {
        vm.logarr.pop()
      }
    },
    clean (val) {
      var vm = this
      // clear
      vm.record = ''
      vm.num1 = '0'
      vm.num2 = ''
      vm.operator = ''
      vm.neg1 = ''
      vm.neg2 = ''
    },
    negtive () {
      var vm = this
      if (vm.num1.indexOf('=') === 0) {
        vm.record = ''
        vm.num1 = ''
      }
      if (vm.operator === '') {
        if (vm.neg1.length > 0) {
          vm.neg1 = ''
        } else {
          vm.neg1 = '-'
        }
      } else {
        if (vm.neg2.length > 0) {
          vm.neg2 = ''
        } else {
          vm.neg2 = '-'
        }
      }
    },
    goBack (val) {
      this.$router.push({ path: '/' })
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

.content {
  position: relative;
  height: 100%;
  background-color: rgb(7, 7, 7);
}
.topbox {
  position: relative;
  padding: 14px;
  height: 76vw;
  background-color: black;
  color:white
}
.delete {
  background-image: url("../assets/images/lottery/icon004.png");
  background-repeat: no-repeat;
  background-position: 45%;
  background-size: auto 35%;
}
.numberbox {
  position: relative;
  z-index: 2;
  height: 114vw;
  background-color: rgb(7, 7, 7);
}
.keyboard {
  display: block;
  height: 114vw;
  padding-left: 3vw;
  padding-top: 2vw;
  border-top: 0.09vw solid rgb(26, 26, 26);
}
.log {
  position: absolute;
  top: 84vw;
  width: 100%;
  background-color: black;
  height: 115vw;
  padding-top: 2vw;
  border-top: 0.09vw solid rgb(26, 26, 26);
  z-index: 1;
}
.logcontent ul li span:nth-child(1) {
  color:rgb(182, 182, 182);
}
.logcontent ul li span:nth-child(3) {
  color:white;
  font-size: 7vw
}
.logcontent ul li {
  text-align: right;
  padding: 4vw;
  border-bottom: .3vw solid rgb(26, 26, 26);
}
.logcontent ul li:last-child{
  text-align: right;
  padding: 4vw;
  border: none;
}
.action {
  color: rgb(255, 123, 0);
  font-size: 3vw;
  position: absolute;
  bottom: 0vw;
  width: 100%;
  border-top: 0.09vw solid rgb(26, 26, 26);
  padding: 0 25vw 0 25vw;
}
.action ul li {
  float: left;
  padding: 2vw;
  height: 10vw;
  width: 21%;
  text-align: center;
}
.keyboard ul li {
  width: 9%;
  height: 9vw;
  float: left;
  text-align: center;
  padding: 20px;
  border-radius: 17vw;
  margin: 1vw 2vw 0.2vw 2vw;
  background-color: rgb(19, 19, 19)
}
.keyboard ul li:nth-child(4) span,
.keyboard ul li:nth-child(8) span,
.keyboard ul li:nth-child(12) span,
.keyboard ul li:nth-child(16) span {
 color:rgb(255, 140, 0)
}
.keyboard ul li:nth-child(19) {
  background-color:rgb(255, 140, 0);
}
.keyboard ul li:nth-child(19) span {
  color:white
}
.keyboard ul li:nth-child(19):active,
.keyboard ul li:nth-child(19) span:active {
 background-color:rgb(252, 175, 81);
}
.keyboard ul li:active {
  background-color: #898989;
   -webkit-user-select: none;
}
.zero {
  width: 33.4% !important;
}
.record {
  position: absolute;
  right: 0vw;
  top: 33vw;
  text-align: right;
  width: 100%;
  padding: 2vw 4vw 2vw 0;
  font-size: 12vw;
  color: rgb(182, 182, 182);
  word-break: break-all
}
.result {
  position: absolute;
  bottom: 0vw;
  right: 0vw;
  text-align: right;
  width: 100%;
  padding: 2vw 4vw 2vw 0;
  font-size: 16vw;
  word-break: break-all
}
.numberbox li span {
  font-size: 7vw;
  font-weight: 900;
  color: #898989
}
.over {
  font-size: 11vw
}
.overrecord {
  font-size: 9vw
}
div.slide {
  width: 100%;
  position: absolute;
  height: 6vw;
}
div.slide ul li {
  position: absolute;
  width: 8.66667vw;
  height: .2vw;
  top: 3vw;
  left: 50%;
  border-radius: .8vw;
  background-color: rgb(26, 26, 26);
}
div.slide ul li:nth-child(1) {
  transform: translate(-50%,1vw);
}
div.slide ul li:nth-child(2) {
  transform: translate(-50%);
}
div.slide ul li:nth-child(3) {
  transform: translate(-50%,-1vw);
}
.action {
  background-color: rgb(7, 7, 7);
}
ul {
  padding: 0vw
}

</style>
