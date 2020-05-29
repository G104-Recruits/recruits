<template>
  <div>
    <Top :data="data.user" :project="false" :diffUser="diffUser" :btnClick="openPopUp" />
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

    <div id="invite" class="popup">
      <div class="black"></div>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'

import $ from 'jquery'

export default {
  name: "Profile",
  components: {
    Top
  },
  data: function() {
    return {
      data: {
        user: {}
      }
    }
  },
  methods: {
    openPopUp: function() {
      $('div#invite.popup').addClass('open');
    },
    getData: function() {
      var vm = this;
      $.ajax({
        url: 'https://masrecruits.000webhostapp.com/api/get_users.php',
        data: {
          id: vm.curId
        },
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          vm.$set(vm.data, 'user', data);
        }
      });
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
  mounted() {
    this.$root.preparePopUps();
    this.getData();
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
</style>