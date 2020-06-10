<template>
  <div>
    <Top :data="data" :privdata="privdata" :project="true" :btnClickPedidos="openConvidarPopUp" :isPart="isPart" />
    <div class="menu" v-if="isPart">
      <div class="left">
        <div class="item" :class="{active: window == 0}" v-on:click="setWindow(0)">Tarefas</div>
        <div class="item" :class="{active: window == 1}" v-on:click="setWindow(1)">Colaboradores</div>
        <div class="item" :class="{active: window == 2}" v-on:click="setWindow(2)">Notas</div>
      </div>
      <div class="right">
        <span v-if="window != 1" v-on:click="openPopUp()" class="shadow"><font-awesome-icon icon="plus" size="1x" /></span>
      </div>
    </div>
    <div class="menu" v-if="!isPart">
      <div class="left">
        <div class="item active">Junte-se a este projeto...</div>
      </div>
      <div class="right">
        <a class="button secondary" v-on:click="$root.joinProject($route.params.id)">Participar</a>
      </div>
    </div>

    
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="tasks" v-if="window == 0">
        <Card v-for="(task, index) in privdata.tasks" :key="task.id" :project="false" :data="task" :detalhesFun="()=>{setWindow(3);activeTask(index)}" />
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="colabs" v-if="window == 1">
        <h3>Proprietário</h3>
        <ColabIcon v-for="colab in filterColabs(2)" :key="colab.id" :data="colab" />
        <h3>Administradores</h3>
        <ColabIcon v-for="colab in filterColabs(1)" :key="colab.id" :data="colab" />
        <h3>Colaboradores</h3>
        <ColabIcon v-for="colab in filterColabs(0)" :key="colab.id" :data="colab" />
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="colabs" v-if="window == 2">
        <Note v-for="note in privdata.notes" :key="note.id" :data="note" />
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="notes" v-if="window == 3 || window == 4" style="margin: 20px">
          <h4>{{privdata.tasks[tarefaAtiva].nome}}</h4>
          <div class="item" :class="{active: window == 3}" v-on:click="setWindow(3)">Notas</div>
          <div class="item" :class="{active: window == 4}" v-on:click="setWindow(4)">Colaboradores</div>
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="notes" v-if="window == 3">
        <Note v-for="note in privdata.tasks[tarefaAtiva].notas" :key="note.id" :data="note" />
      </div>
    </transition>

    <transition enter-active-class="animate__animated animate__fadeIn">
      <div class="notes" v-if="window == 4">
        <ColabIcon v-for="colab in privdata.tasks[tarefaAtiva].users" :key="colab.id" :data="colab" />
      </div>
    </transition>

    <div id="pedidos" class="popup">
      <div class="black"></div>
      <div class="content">
        <div v-for="colab in filterColabs(null)" :key="colab.id"><p>{{ colab.nome }}</p><a class="button secondary" v-on:click="$root.invite($route.params.id, colab.id)">Aceitar</a></div>
      </div>
    </div>

    <div id="criarTask" class="popup">
      <div class="black"></div>
      <div class="content">
        <form id="createTask">
          <h1>Crie uma tarefa...</h1>

          <div>
            <label for="">Nome</label>
            <input type="text" name="title">
          </div>

          <div>
            <label for="">Descrição</label>
            <textarea name="first_message" cols="30" rows="10"></textarea>
          </div>

          <a class="button" v-on:click="createTask()">Criar</a>
        </form>
      </div>
    </div>

    <div id="criarNotaProjeto" class="popup">
      <div class="black"></div>
      <div class="content">
        <form id="createProjectNote">
          <h1>Crie uma nota de projeto...</h1>

          <div>
            <label for="">Tipo</label>
            <span class="options">
              <span class="option"><input type="radio" name="privacy" id="type_priv" value=1><label for="type_priv">Privado</label></span>
              <span class="option"><input type="radio" name="privacy" id="type_pub" value=0 checked><label for="type_pub">Público</label></span>
            </span>
          </div>

          <div>
            <label for="">Texto</label>
            <textarea name="text" cols="30" rows="10"></textarea>
          </div>

          <a class="button" v-on:click="createProjectNote()">Criar</a>
        </form>
      </div>
    </div>

    <div id="criarNotaTarefa" class="popup">
      <div class="black"></div>
      <div class="content">
        <form id="createTaskNote">
          <h1>Crie uma nota de tarefa...</h1>

          <div>
            <label for="">Texto</label>
            <textarea name="text" cols="30" rows="10"></textarea>
          </div>

          <a class="button" v-on:click="createTaskNote()">Criar</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Card from '@/components/Card.vue'
import ColabIcon from '@/components/ColabIcon.vue'
import Note from '@/components/Note.vue'

import $ from 'jquery'

export default {
  name: "Project",
  data: function() {
    return {
      data: {},
      privdata: {
        tasks: [],
        colabs: [],
        notes: []
      },
      window: 0,
      tarefaAtiva: 0
    }
  },
  components: {
    Top, Card, ColabIcon, Note
  },
  methods: {
    openConvidarPopUp: function() {
      $('div#pedidos.popup').addClass('open');
    },
    getProject: function(id=false) {
      if (id === false)
        id = this.$route.params.id;

      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "get_projects.php",
        data: {
          id: id
        },
        async: false,
        method: 'GET',
        success: function(data) {
          vm.$set(vm, 'data', data);

        }
      });
      
      this.getTasks(id);
      this.getColabs(id);
      this.getNotes(id);
    },
    getTasks: function(id) {
      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "get_tasks.php",
        data: {
          projectId: id
        },
        async: false,
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'tasks', data);
        }
      });
    },
    getColabs: function(id) {
      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "get_colabs.php",
        data: {
          projectId: id
        },
        async: false,
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'colabs', data);
        }
      });
    },
    getNotes: function(id) {
      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "get_notes.php",
        data: {
          projectId: id
        },
        async: false,
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'notes', data);
        }
      });
    },
    setWindow: function(pos) {
      this.$set(this, 'window', pos);
    },
    filterColabs: function (papel) {
      var colabs = [];
      for (var i=0;i<this.privdata.colabs.length;i++)
        if (this.privdata.colabs[i].papel == papel)
          colabs.push(this.privdata.colabs[i]);
      return colabs;
    },
    openPopUp: function(id=false) {
      if (id === false) {
        switch(this.window) {
          case 0:
            this.openPopUp("criarTask");
            break;
          case 2:
            this.openPopUp("criarNotaProjeto");
            break;
          case 3:
            this.openPopUp("criarNotaTarefa");
            break;
          case 4:
            this.joinCurTask();
            break;
        }
      }
      else {
        $('div#' + id + '.popup').addClass('open');
      }
    },
    createProjectNote: function() {
      var vm = this;
      var data = $('form#createProjectNote').serializeArray();
      data.push({name: "projectId", value: this.$route.params.id});

      $.ajax({
        url: vm.$root.apiPath + "create_note.php",
        data: data,
        method: "GET",
        complete: function() {
          vm.$router.go();
        }
      });
    },
    createTaskNote: function() {
      var vm = this;
      var data = $('form#createTaskNote').serializeArray();
      data.push({name: "taskId", value: this.privdata.tasks[this.tarefaAtiva].id});

      $.ajax({
        url: vm.$root.apiPath + "create_note.php",
        data: data,
        method: "GET",
        complete: function() {
          vm.$router.go();
        }
      });
    },
    createTask: function() {
      var vm = this;
      var data = $('form#createTask').serializeArray();
      data.push({name: "projectId", value: this.$route.params.id});

      $.ajax({
        url: vm.$root.apiPath + "create_task.php",
        data: data,
        method: "GET",
        complete: function() {
          vm.$router.go();
        }
      });
    },
    activeTask: function(pos) {
      this.$set(this, 'tarefaAtiva', pos);
    },
    joinCurTask: function() {
      var vm = this;
      
      $.ajax({
        url: vm.$root.apiPath + "join_task.php",
        data: {
          taskId: vm.privdata.tasks[vm.tarefaAtiva].id
        },
        complete: function() {
          vm.$router.go();
        }
      });
    }
  },
  beforeMount() {
    this.getProject();
  },
  beforeRouteUpdate (to, from, next) {
    this.getProject(to.params.id);
    next();
  },
  mounted() {
    this.$root.preparePopUps();
  },
  computed: {
    isPart: function() {
      for(var i=0;i<this.privdata.colabs.length;i++)
        if(this.privdata.colabs[i].id === this.$root.auth.user.id && this.privdata.colabs[i].papel != null)
          return true;
      
      this.setWindow(2)
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
div.menu {
  width: 100%;
  background-color: #C95925;

  div {
    display: inline-block;

    &.right {
      float: right;
      line-height: 50px;

      span {
        width: 80px;
        height: 80px;
        text-align: center;
        display: inline-block;
        background-color: #C95925;
        border-radius: 50%;
        position: relative;
        top: -40px;
        right: 20px;
        color: white;
        font-size: 40px;
        cursor: pointer;

        svg {
          padding: 20px 0;
        }

        a {
          line-height: 50px;
        }
      }
    }

    &.item {
      padding: 15px 25px;
      color: white;
      opacity: .6;
      cursor: pointer;

      &.active {
        opacity: 1;
      }

      &.disabled {
        cursor: not-allowed;
      }

      &:not(.active):hover {
        opacity: .8;
      }
    }
  }
}


div.popup {
  width: 100%;
  height: 100%;
  display: none;

  &.open {
    display: block;
  }

  div.content {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
div.tasks {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 20px;
  
  & > div {
    flex-grow: 1;
    margin: 10px;
  }
}

form {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  box-sizing: border-box;

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

div.notes {
  div.item {
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;

    &.active {
      border-bottom: 2px solid #C95925;
    }
  }
}
</style>