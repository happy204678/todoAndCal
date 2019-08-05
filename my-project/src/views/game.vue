<template>
  <div class="game-bg">
    <div class="player">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
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
  .player {
    width: 100%;
  }
  .player ul li {
    position: absolute;
    bottom: 10px;
    background-color: white;
    width:9%;
    height: 135px;
    border-top-left-radius: 4vw;
    border-top-right-radius: 4vw;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
  }
  .player ul :last-child {
    right:5vw
  }
  .player ul :nth-child(1) {
    left:5vw
  }
  /* 15vw 7vw 2vw */
  .player ul :nth-child(2) {
    left: 10vw
  }
  .player ul :nth-child(3) {
    left: 20vw
  }
  .player ul :nth-child(4) {
    left: 30vw
  }
  .player ul :nth-child(5) {
    left: 40vw
  }
  .player ul :nth-child(6) {
    left: 50vw
  }
  .player ul :nth-child(7) {
    left: 60vw
  }
  .player ul :nth-child(8) {
    left: 70vw
  }
  .player ul :nth-child(9) {
    left: 80vw
  }
</style>
