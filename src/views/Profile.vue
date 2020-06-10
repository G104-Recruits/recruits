<template>
  <div>
    <Top :data="data.user" :project="false" :diffUser="diffUser" :btnClickConvidar="openConvidarPopUp" :btnClickConvites="openConvitesPopUp" />
    <div class="menu">
      <div class="left">
        <div class="item active">Projetos</div>
        <div class="item disabled">Ligações</div>
        <div class="item disabled">Connects</div>
      </div>
      <div class="right" v-if="!diffUser">
        <router-link to="/create">
          <span class="shadow"><font-awesome-icon icon="plus" size="1x" /></span>
        </router-link>
      </div>
    </div>
    
    <div class="projects">
      <Card v-for="project in userProjects()" :project="true" :data="project" :key="project.id" />
    </div>

    <div id="invite" class="popup">
      <div class="black"></div>
      <div class="content">
        <div v-for="project in inviteableProjects()" :key="project.id"><p>{{ project.nome }}</p><a class="button secondary" :class="{disabled: alreadyInvited(project)}" v-on:click="$root.invite(project.id, $route.params.id)">Convidar</a></div>
      </div>
    </div>

    <div id="invites" class="popup">
      <div class="black"></div>
      <div class="content">
        <div v-for="project in data.invites" :key="project.id"><p>{{ project.nome }}</p><a class="button secondary" v-on:click="$root.joinProject(project.id)">Aceitar</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Card from '@/components/Card.vue'

import $ from 'jquery'

export default {
  name: "Profile",
  components: {
    Top, Card
  },
  data: function() {
    return {
      data: {
        user: {},
        invites: {}
      }
    }
  },
  methods: {
    openConvidarPopUp: function() {
      $('div#invite.popup').addClass('open');
    },
    openConvitesPopUp: function() {
      $('div#invites.popup').addClass('open');
    },
    getData: function(id=false) {
      if (id === false)
        id = this.curId;

      var vm = this;
      $.ajax({
        url: vm.$root.apiPath + 'get_users.php',
        data: {
          id: id
        },
        async: false,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          vm.$set(vm.data, 'user', data);
        }
      });

      this.getUserInvites(id);
    },
    inviteableProjects: function() {
      var vm = this;
      var result = [];

      $.ajax({
        url: vm.$root.apiPath + "get_projects.php",
        data: {
          userId: vm.$root.auth.user.id,
          role: 1
        },
        async: false,
        success: data => {
          result = data;
        }
      });

      return result;
    },
    getUserInvites: function(id) {
      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "get_invites.php",
        data: {
          userId: id
        },
        async: false,
        success: data => {
          vm.$set(vm.data, 'invites', data);
        }
      });
    },
    userProjects: function() {
      var vm = this;
      var result = [];

      $.ajax({
        url: vm.$root.apiPath + "get_projects.php",
        data: {
          userId: vm.curId,
          role: 0
        },
        async: false,
        success: function(data) {
          result = data
        }
      });

      return result;
    },
    alreadyInvited(project) {
      for (var i=0;i<this.data.invites.length;i++)
        if (this.data.invites[i].id === project.id)
          return true;
      return false;
    }
  },
  computed: {
    curId: function() {
      if (Object.keys(this.$route.params).includes('id'))
        return this.$route.params.id;
      else if (Object.keys(this.$root.auth.user).includes('id'))
        return this.$root.auth.user.id;

      return -1;
    },
    diffUser: function() {
      if (this.curId == this.$root.auth.user.id)
        return false;
      return true;
    }
  },
  beforeMount() {
    this.getData();
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData();
    })
  },
  mounted() {
    this.$root.preparePopUps();
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

div.projects {
  display: flex;

  & > div {
    margin: 10px;
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

div.projects {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 20px;
  
  & > div {
    flex-grow: 1;
  }
}
</style>