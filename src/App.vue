<template>
  <div id="app">
    <Nav />
    <transition enter-active-class="animate__animated animate__fadeIn">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: sans-serif;
}

.shadow {
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,.25);
}

div.popup {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;

  &:not(.open) {
    div.black {
      display: none;
    }
  }

  div.black {
    position: absolute;
    z-index: -1;

    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,.7);
    cursor: pointer;  
  }
}

a.button {
  background-color: #C95925;
  box-shadow: 2px 2px 10px rgba(0,0,0,.25);
  color: white;
  border-radius: 3px;
  padding: 6px 35px;
  text-decoration: none;
  margin-right: 30px;
  cursor: pointer;

  &.secondary {
    background-color: #C4C4C4;
    color: black;
  }

  &.disabled {
    filter: opacity(.6);
    cursor: not-allowed;
  }
}
</style>
