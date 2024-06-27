<script lang="ts">
  export { _class as class };
  let _class = '';

  export { _style as style };
  let _style = '';
</script>

<div
  class="spinner {_class}"
  style="{_style}"
>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<style>
  .spinner {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .spinner div {
    -webkit-transform-origin: 32px 32px;
    -ms-transform-origin: 32px 32px;
    transform-origin: 32px 32px;
    -webkit-animation: spinner 1.2s linear infinite;
    animation: spinner 1.2s linear infinite;
  }
  .spinner div:after {
    content: ' ';
    display: block;
    position: absolute;
    height: 14px;
    left: 30px;
    top: 5px;
    width: 4px;
    border-radius: 20%;
    background: #fff;
  }
  .spinner div:nth-child(1) {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .spinner div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .spinner div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .spinner div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .spinner div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .spinner div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .spinner div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .spinner div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .spinner div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .spinner div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .spinner div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
  .spinner div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  @-webkit-keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
