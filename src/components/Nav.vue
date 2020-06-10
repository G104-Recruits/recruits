<template>
  <div id="nav" class="shadow" :class="{'centered':  $root.auth.loggedin}">
    <div class="open_burger" v-if="$root.auth.loggedin" v-on:click="openBurger()">
      <font-awesome-icon icon="bars" size="lg" />
    </div>
    
    <img src="@/assets/logo.png" alt="">

    <div class="login right" v-if="!$root.auth.loggedin">
      <a :href="'https://github.com/login/oauth/authorize?client_id='+$root.clientIds[1]">
        <div class="button shadow">
          <p>Log In</p>
          <font-awesome-icon :icon="['fab', 'github']" size="lg" />
        </div>
      </a>
    </div>

    <div class="profile_image shadow right" v-if="$root.auth.loggedin" :style="{'background-image': 'url('+$root.getUserImage()+')'}"></div>

    <div id="menu" class="popup" v-if="$root.auth.loggedin">
      <div class="black"></div>
      <div class="burger shadow">
        <img src="@/assets/logo.png" alt="">

        <div class="user_area">
          <div class="profile_image shadow" :style="{'background-image': 'url('+$root.getUserImage()+')'}"></div>
          <span>
            <p class="welcome">Bem-vindo</p>
            <p class="username">{{ $root.auth.user.nome }}</p>
          </span>
        </div>

        <div class="link_area">
          <router-link to="/user"><p :class="{active: ($route.path == '/user')}">Meu Perfil</p></router-link>
          <router-link to="/search/0"><p :class="{active: ($route.path == '/search/0')}">Encontrar Projetos</p></router-link>
          <router-link to="/search/1"><p :class="{active: ($route.path == '/search/1')}">Encontrar Pessoas</p></router-link>
        </div>
        <div class="link_area">
          <p>Definições</p>
          <p class="logout" v-on:click="$root.logout()">Log Out</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Nav",
  methods: {
    openBurger: function() {
      $('div#menu.popup').addClass('open');
    }
  },
  mounted() {
    this.$root.preparePopUps();
  }
}
</script>

<style lang="scss" scoped>
div#nav {
  background-color:white;
  width: 100%;
  height: 60px;
  padding: 10px 25px;
  box-sizing: border-box;
    
  &.centered {
    text-align: center;
  }

  img {
    height: 100%;
    cursor: pointer;
  }

  .right {
    float: right;
    padding: 5px 0;
    box-sizing: border-box;
  }

  div.profile_image {
    background-color: #eee;
    width: 40px;
    height: 40px;

    background-size: cover;
    background-position: center center;

    border-radius: 50%;
    cursor: pointer;
  }

  div.login {
    a {
      text-decoration: none;
    }
    
    div.button {
      height: 100%;
      display: table;

      background-color: black;
      color: white;
      border-radius: 5px;
      transition: .3s ease-in-out;
      
      font-size: 18px;
      padding: 0 5px;

      &:hover {
        background-color: #222;
        cursor: pointer;
      }

      p {
        margin: 0;
      }

      p, svg {
        display: table-cell;
        vertical-align: bottom;
        padding: 5px;
      }
    }
  }

  div.open_burger {
    display: flex;
    float: left;
    height: 100%;
    cursor: pointer;

    svg {
      margin: auto;
    }
  }

  div.popup {
    &.open {
      div.burger {
        left: 0;
      }
    }

    div.burger {
      position: absolute;
      left: -300px;
      transition: .5s ease-in-out;

      height: 100vh;
      width: 300px;
      background-color: white;
      text-align: center;

      padding:30px;
      box-sizing: border-box;

      img {
        width: 80%;
        height: auto;
      }

      div.user_area {
        margin-top: 30px;

        div.profile_image {
          display: inline-block;
          width: 150px;
          height: 150px;
        }

        span {
          display: inline-block;
          padding: 20px 0;

          p.welcome, p.username {
            font-weight: 500;
            margin: 0
          }

          p.welcome {
            color: #666;
            font-size: 18px;
          }

          p.username {
            font-size: 22px;
          }
        }
      }

      div.link_area {
        border-top: 1px solid black;

        a {
          color: black;
          text-decoration: none;
        }

        p {
          text-align: left;
          font-size: 20px;
          opacity: .55;
          cursor: pointer;

          &:hover {
            opacity: .8;
          }

          &.active {
            opacity: 1;
          }

          &.logout {
            color: #d82b2b;
          }
        }
      }
    }
  }
}
</style>