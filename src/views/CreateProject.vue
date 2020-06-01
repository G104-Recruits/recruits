<template>
  <div class="create" style="text-align: center;">
    <form id="createProject" class="shadow">
      <h1>Crie um novo projeto...</h1>

      <div>
        <label for="">Nome</label>
        <input type="text" name="nome">
      </div>

      <div>
        <label for="">Tipo</label>
        <span class="options">
          <span class="option"><input type="radio" name="tipo" id="type_priv" value=1><label for="type_priv">Privado</label></span>
          <span class="option"><input type="radio" name="tipo" id="type_pub" value=0 checked><label for="type_pub">Público</label></span>
        </span>
      </div>

      <div>
        <label for="">URL (opcional)</label>
        <input type="text" name="website">
      </div>

      <div>
        <label for="">Link do MS Teams (opcional)</label>
        <input type="text" name="teams">
      </div>

      <div>
        <label for="">Descrição</label>
        <textarea name="bio" cols="30" rows="10"></textarea>
      </div>

      <a class="button" v-on:click="createProject()">Criar</a>
    </form>
  </div>
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
        data: $('form#createProject').serializeArray(),
        method: "GET",
        complete: function() {
          vm.$router.push({path:'/user'});
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 30%;
  max-width: 400px;
  padding: 10px;

  h1 {
    font-weight: 500;
  }

  div {
    margin: 25px 0;
    
    input, textarea {
      background-color: #E1E1E1;
      border: 0;
      width: 100%;
      outline: 0;
      box-sizing: border-box;
    }

    input {
      height: 30px;
    }

    textarea {
      resize: none;
    }

    label {
      padding: 7px 0;
      display: inline-block;
    }

    span.options {
      white-space: nowrap;

      span.option {
        input {
          display: none;
        }

        input:checked + label {
          background-color: #C95925;
          color: white;
        }

        label {
          background-color: #E1E1E1;
          padding: 1px 2px;
          width: 50%;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }

  a {
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
