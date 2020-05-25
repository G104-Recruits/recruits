<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    Nav
  },
  mounted() {
    $('div.black').click(function(event) {
      $(event.target).closest('div.popup').toggleClass('open');
      $(event.target).fadeOut();
    });
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
</style>
