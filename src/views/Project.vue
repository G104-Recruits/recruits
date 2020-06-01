<template>
  <div>
    <Top :data="data" :privdata="privdata" :project="true" />
    <div class="menu" v-if="isPart">
      <div class="left">
        <div class="item active">Tarefas</div>
        <div class="item">Colaboradores</div>
        <div class="item">Notas</div>
      </div>
      <div class="right">
        <span class="shadow"><font-awesome-icon icon="plus" size="1x" /></span>
      </div>
    </div>
    <div class="menu" v-if="!isPart">
      <div class="left">
        <div class="item active">Junte-se a este projeto...</div>
      </div>
      <div class="right">
        <a class="button secondary">Participar</a>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'

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
      }
    }
  },
  components: {
    Top
  },
  methods: {
    getProject: function() {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/get_projects.php",
        data: {
          id: vm.$route.params.id
        },
        method: 'GET',
        success: function(data) {
          vm.$set(vm.data, 'public', data);
        }
      });
      
      this.getTasks();
      this.getColabs();
      this.getNotes();
    },
    getTasks: function() {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/get_tasks.php",
        data: {
          projectId: vm.$route.params.id
        },
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'tasks', data);
        }
      });
    },
    getColabs: function() {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/get_colabs.php",
        data: {
          projectId: vm.$route.params.id
        },
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'colabs', data);
        }
      });
    },
    getNotes: function() {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/get_notes.php",
        data: {
          projectId: vm.$route.params.id
        },
        method: 'GET',
        success: function(data) {
          vm.$set(vm.privdata, 'notes', data);
        }
      });
    }
  },
  beforeMount() {
    this.getProject();
  },
  computed: {
    isPart: function() {
      for(var i=0;i<this.privdata.colabs.length;i++)
        if(this.privdata.colabs[i].id === this.$root.auth.user.id)
          return true;
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
</style>