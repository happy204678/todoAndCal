<template>
  <div>
    <div class="header bg-color1">
      <div class="back" @click="goBack()"><a href="javascript://">返回</a></div>
      <h2>Todo List</h2>
    </div>
    <div class="content">
      <div class="input">
        <input class="text" type="text" placeholder="add Todo...">
        <input type="button" value="+" @click="addTodo">
        </div>
      <div class="clickfunc">
        <input type="button" value="Done" @click="done()">
        <input class="delete" @click="deleteTodo()" type="button" value="Delete">
        <input class="modify" @click="modifyTodo()" type="button" value="Modify">
      </div>
    </div>
    <div class="listplace" >
      <div class="list todolist">
        <h2>Todo List:</h2>
        <ul>
        </ul>
      </div>
      <div class="list donelist">
        <h2>Done List:</h2>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      hastodo: false,
      modifyclicked: false,
      savespan: '',
      thisli: '',
      thisspan: '',
      step: [false, false, false, false],
      todocookie: [],
      donecookie: []
    }
  },
  watch: {
    'hastodo' (val) {
      if (val === true) {
        $('.listplace').css('display', '-webkit-box')
      } else {
        $('.listplace').css('display', 'none')
      }
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    addTodo () {
      if (this.modifyclicked) {
        this.notmod()
      }
      var todo = $('.input>.text').val()
      if (todo !== '' && todo !== undefined) {
        $('.todolist ul').append('<li class="li" style="margin: 2vw 0 2vw 0"><input type="checkbox" class="check"><span style="width: 40vw;position: absolute;overflow: hidden;height: 5vw;">' + todo + '</span></li>')
        $('.input>.text').val('')
      }
      this.displaytodolist()
    },
    modifyTodo () {
      var lilength = $('.todolist ul').children().length
      var count = 0
      var vm = this
      if (this.modifyclicked) {
        if (vm.thisli.children('input.modifyval').val() !== '') {
          vm.thisli.append('<span style="width: 39vw;position: absolute;overflow: hidden;height: 5vw;">' + vm.thisli.children('input.modifyval').val() + '</span>')
          vm.thisli.children('input.check').removeAttr('disabled')
          vm.thisspan = ''
          vm.thisli.children('input.modifyval').remove()
          vm.thisli = ''
          vm.savespan = ''
          this.modifyclicked = false
          $('.modify').removeAttr('style')
        } else {
          vm.notmod()
        }
        this.displaytodolist()
      } else {
        for (let i = 0; i < lilength; i++) { // push in tmp or notchcked
          if ($('.todolist ul li .check').eq(i).prop('checked') === true) {
            vm.thisspan = $('.todolist ul li span').eq(i)
            vm.savespan = $('.todolist ul li span').eq(i).html()
            vm.thisli = $('.todolist ul li').eq(i)
            count++
          }
        }
        if (count === 1) {
          this.modifyclicked = true
          vm.thisli.children('input').prop('disabled', 'disabled')
          vm.thisli.children('input').prop('checked', false)
          $('.modify').css({'background-color': '#ff9900', 'color': 'white', 'border': '#ff9900'})
          vm.history = vm.thisspan
          vm.thisspan.remove()
          vm.thisli.append('<input class="modifyval" type="text" style="width: 40vw;">')
        } else if (count < 1) {
        } else {
          alert('一次只能修改一個')
        }
      }
    },
    notmod () {
      this.thisli.append('<span style="width: 39vw;position: absolute;overflow: hidden;height: 5vw;">' + this.savespan + '</span>')

      this.thisli.children('input.check').removeAttr('disabled')
      this.thisspan = ''
      this.thisli.children('input.modifyval').remove()
      this.thisli = ''
      this.savespan = ''
      this.modifyclicked = false
      $('.modify').removeAttr('style')
    },
    deleteTodo () {
      if (this.modifyclicked) {
        this.notmod()
      }
      var notchecked = []
      var lilength = $('.todolist ul').children().length

      for (let i = 0; i < lilength; i++) { // push in tmp or notchcked
        if ($('.todolist ul li .check').eq(i).prop('checked') === false) {
          let span = $('.todolist ul li span').eq(i).html()
          notchecked.push(span)
        }
      }
      $('.todolist ul li').remove() // remove all li
      for (let i = 0; i < notchecked.length; i++) { // append not checked li
        $('.todolist ul').append('<li class="li" style="margin: 2vw 0 2vw 0"><input type="checkbox" class="check"><span style="width: 40vw;position: absolute;overflow: hidden;height: 5vw;">' + notchecked[i] + '</span></li>')
      }
      this.displaytodolist()
    },
    done () {
      if (this.modifyclicked) {
        this.notmod()
      }
      var tmp = [] // checked
      for (let i = 0; i < $('.todolist ul').children().length; i++) { // push in tmp or notchcked
        if ($('.todolist ul li .check').eq(i).prop('checked') === true) {
          let span = $('.todolist ul li span').eq(i).html()
          tmp.push(span)
        }
      }

      this.deleteTodo()

      for (let i = 0; i < tmp.length; i++) { // append to donelist
        $('.donelist ul').append('<li style="margin: 2vw 0 2vw 0"><input type="checkbox" checked disabled><span style="width: 39vw;position: absolute;overflow: hidden;height: 5vw;">' + tmp[i] + '</span><li>')
      }
      this.displaytodolist()
    },
    displaytodolist () {
      if ($('.todolist ul li').length > 0 || $('.donelist ul li').length > 0) {
        this.hastodo = true
      } else {
        this.hastodo = false
      }
      this.reset()
      this.setCookie(this.todocookie, this.donecookie, 3)
    },
    setCookie (todo, done, exdays) {
      this.delcoockie('todo')
      this.delcoockie('done')
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'todo' + '=' + todo + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'done' + '=' + done + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie () {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'todo') {
            let arr3 = arr2[1].split(',') // 再次切割
            for (let j = 0; j < arr3.length; j++) {
              if (arr3[j] !== '') {
                console.log(document.cookie)
                $('.todolist ul').append('<li class="li" style="margin: 2vw 0 2vw 0"><input type="checkbox" class="check"><span style="width: 40vw;position: absolute;overflow: hidden;height: 5vw;">' + arr3[j] + '</span></li>')
              }
            }
          } else if (arr2[0] === 'done') {
            let arr3 = arr2[1].split(',') // 再次切割
            for (let j = 0; j < arr3.length; j++) {
              if (arr3[j] !== '') {
                $('.donelist ul').append('<li class="li" style="margin: 2vw 0 2vw 0"><input type="checkbox" class="check" disabled checked><span style="width: 40vw;position: absolute;overflow: hidden;height: 5vw;">' + arr3[j] + '</span></li>')
              }
            }
          }
        }
        this.displaytodolist()
      }
    },
    delcoockie (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      document.cookie = name + '=;expires=' + exp.toGMTString()
    },
    reset () {
      this.todocookie = []
      this.donecookie = []
      let todolength = $('.todolist ul li').length
      let donelength = $('.donelist ul li').length
      let span
      for (let i = 0; i < todolength; i++) {
        span = $('.todolist ul li span').eq(i).html()
        this.todocookie.push(span)
      }
      for (let i = 0; i < donelength; i++) {
        span = $('.donelist ul li span').eq(i).html()
        this.donecookie.push(span)
      }
    },
    goBack () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.content {
  margin: 2vw 0 2vw 0;
  background-color: rgb(15, 15, 15);
  border-bottom:2px solid rgb(100, 100, 100);
  border-top: 1px solid rgb(32, 32, 32);
}
.listplace {
  background-color: rgb(15, 15, 15);
  border-bottom:2px solid rgb(100, 100, 100);
  border-top: 1px solid rgb(32, 32, 32);
  height: auto;
  display: none;
  color: #fff;
}
.content h2, .list h2{
    font-size: 9vw;
    color: white;
}
input{
  border-radius: 4vw;
  border: groove;
}
.list {
  width: 50%;
  padding: 1vw
}
.text {
  padding: 1vw
}
.input {
  padding: 5vw;
  text-align: center;
}
.clickfunc {
  padding: 0 5vw 5vw 5vw;
  margin: 0 1vw 0 1vw;
  text-align: center;
}
.list ul li {
  margin: 2vw 0 2vw 0 ;
}

</style>
