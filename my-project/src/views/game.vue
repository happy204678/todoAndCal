<template>
  <div class="game-bg">
    <div class="top">
      <div class="identify"></div>
    </div>
    <div class="player">
      <ul>
        <li><div><span>1</span><p>123</p></div></li>
        <li><div><span>2</span><p>123</p></div></li>
        <li><div><span>3</span><p>123</p></div></li>
        <li><div><span>4</span><p>123</p></div></li>
        <li><div><span>5</span><p>123</p></div></li>
        <li><div><span>6</span><p>123</p></div></li>
        <li><div><span>7</span><p>123</p></div></li>
        <li><div><span>8</span><p>123</p></div></li>
        <li><div><span>9</span><p>123</p></div></li>
        <li><div><span>10</span><p>123</p></div></li>
      </ul>
    </div>
    <div class="pass-bt">
      <button>結束發言</button>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {

    }
  },
  mounted () {
    $('.game-bg').fadeIn(1000, () => {
      $('.player ul li:nth-child(5), .player ul li:nth-child(6)').animate({bottom: '17vw'}, 1000, 'swing')
      $('.player ul li:nth-child(4), .player ul li:nth-child(7)').animate({bottom: '15vw'}, 1000, 'swing')
      $('.player ul li:nth-child(3), .player ul li:nth-child(8)').animate({bottom: '13vw'}, 1000, 'swing')
      $('.player ul li:nth-child(2), .player ul li:nth-child(9)').animate({bottom: '10vw'}, 1000, 'swing')
      $('.player ul li:nth-child(1), .player ul li:nth-child(10)').animate({bottom: '5vw'}, 1000, 'swing')
    })


  }
}
</script>


<style scoped>
  .game-bg {
    display: none;
    height: -webkit-fill-available;
    width: 100%;
    background-image: url('../assets/images/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .top {
    height: 20vw;
    width: 100%
  }
  .top .identify {
    float: right;
    background-color: rgb(255, 153, 0);
    border-radius: 1vw;
    border: 5px solid rgb(102, 61, 0);
    width: 10vw;
    height: 16vw;
    margin: 5vw;
  }
  .player {
    width: 100%;
  }
  .player ul li {
    position: absolute;
    bottom: 10px;
    /* background-color: white; */
    width:9%;
    height: 135px;
    border-top-left-radius: 4vw;
    border-top-right-radius: 4vw;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
    background-image: linear-gradient(57deg,#030011,#010046 51%,#966100);
    /* transform:scale(1,1); */
    transition: all .3s cubic-bezier(0.39, 0.58, 0.57, 1);
  }
  .player ul li:hover {
    transform:scale(1.1,1.1);
    z-index: 6
  }
  .player ul li div{
    width: 100%;
    /* text-align: center; */
    color: rgb(255, 235, 205);
    height: 100%;
    padding-top: 3vw;
    font-weight: 700
  }
  .player ul li div span{
    position: absolute;

    top: -1.5vw;
    margin: 0vw auto;
  }
  .player ul li div p{
    position: inherit;
    width: fit-content;
    margin: 0vw auto;
    bottom: 0vw;
  }
  .player ul :last-child {
    right:5vw;
    z-index: 5
  }
  .player ul :nth-child(1) {
    left:5vw;
    z-index: 5
  }
  /* 15vw 7vw 2vw */
  .player ul :nth-child(2) {
    left: 12vw;
    z-index: 4
  }
  .player ul :nth-child(3) {
    left: 21vw;

  }
  .player ul :nth-child(4) {
    left: 31vw;

  }
  .player ul :nth-child(5) {
    left: 41vw
  }
  .player ul :nth-child(6) {
    left: 52vw
  }
  .player ul :nth-child(7) {
    left: 62vw
  }
  .player ul :nth-child(8) {
    left: 72vw
  }
  .player ul :nth-child(9) {
    left: 80vw
  }
  .pass-bt {
    position: absolute;
    bottom: 5vw;
    left: 45vw
  }
  .pass-bt button {
    height: auto;
    font-size: 3vw;
    background: #08002e
  }
</style>
