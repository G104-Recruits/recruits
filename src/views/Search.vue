<template>
  <div class="searchpage">
    <div class="top">
      <h1>Encontre o {{params.projeto?'projeto':'colaborador'}} ideal!</h1>
      <div class="search">
        <input type="text">
        <a href="" class="button"><font-awesome-icon icon="search" size="sm" />Procurar</a>
      </div>
    </div>
    
    <div class="results">
      <Row :project="params.projeto" :data="result" v-for="result in results" :key="result.id" />
    </div>
  </div>
</template>

<script>
import Row from '@/components/Row.vue'

import $ from 'jquery'

export default {
  name: "Search",
  components: {
    Row
  },
  data: function() {
    return {
      results: [],
      numPages: 0,
      curPage: 0,
      params: {
        projeto: false
      }
    }
  },
  methods: {
    searchProjects: function() {
      var vm  = this;

      $.ajax({
        url:  "https://masrecruits.000webhostapp.com/api/get_projects.php",
        success: function(data) {
          vm.$set(vm, 'results', data);
        }
      });
    },
    searchUsers: function() {
      var vm  = this;

      $.ajax({
        url:  "https://masrecruits.000webhostapp.com/api/get_users.php?all",
        success: function(data) {
          vm.$set(vm, 'results', data);
        }
      });
    },
    search() {
      if (this.type())
        this.searchProjects();
      else
        this.searchUsers();
    },
    updateType: function(newValue) {
      alert(newValue);
      this.$set(this.params, 'projeto', newValue);
    },
    type: function(value=false) {
      if (value !== false) {
        if (value != 1) {
          return true;
        }
        return false;
      }
      
      return this.params.projeto;
    }
  },
  beforeMount: function() {
    this.updateType(this.type());
    this.search();
  },
  beforeRouteUpdate (to, from, next) {
    this.updateType(this.type(to.params.type));
    alert(this.type());
    this.search();
    next();
  },
}
</script>

<style lang="scss" scoped>
div.searchpage {
  text-align: center;
}

div.top {
  display: inline-block;
  text-align:left;
  width: 70%;
  min-width: 500px;
  padding: 100px 0;

  div.search {
    width: 100%;
    display: flex;
    font-size: 16px;

    & > * {
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    &:focus-within {
      box-shadow: 2px 2px 10px rgba(0,0,0,.25);
    }

    input[type='text'] {
      border: 0;
      background-color: #E1E1E1;
      float: left;
      border-radius: 3px 0px 0px 3px;
      padding-left: 15px;
      padding-right: 15px;
      flex-grow: 1;
      outline: 0;
    }

    a.button {
      border-radius: 0px 3px 3px 0px;
      float: right;
      margin: 0;
      box-shadow: none;

      svg {
        margin-right: 15px;
      }
    }
  }
}
</style>