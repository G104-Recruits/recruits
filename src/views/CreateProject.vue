<template>
  <a class="button" v-on:click="createProject()">Criar</a>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Criar",
  methods: {
    createProject: function() {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/create_project.php",
        data: {
          nome: "Vue Router",
          bio: "Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.",
          tipo: 0,
          website: "https://router.vuejs.org",
          teams: ""
        },
        method: "GET",
        complete: function() {
          vm.$router.push({path:'user'});
        }
      });
    }
  }
}
</script>

<style>

</style>