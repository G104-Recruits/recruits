import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faBars, faSearch, faGithub, faPlus])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  data: () => {
    return {
      auth: {
        user: {},
        loggedin: false 
      },
      apiPath: "https://masrecruits.000webhostapp.com/api/",
      clientIds: ["9295e459fd68392e0fa6", "bf3d8fb7fa3c22212ce2"]
    }
  },
  methods: {
    login: function () {
      var vm = this;

      $.ajax({
        url: this.apiPath + "get_users.php",
        dataType: "json",
        async: false,
        success: data => {
          if (Object.keys(data).includes("message"))
            return false;
          else {
            vm.$set(this.auth, 'loggedin', true);
            vm.$set(this.auth, 'user', data);
          }
        }
      });
    },
    getUserImage: function(user = false) {
      if (user === false)
        user = this.auth.user
      return this.getLigacao("Image", user);
    },
    getLigacao: function(nome, user = false) {
      if (user === false)
        user = this.auth.user
      
      var l = user.ligacoes;
      for (var i=0; i<l.length; i++)
        if (l[i].nome == nome)
          return l[i].valor;
    },
    logout: function() {
      this.$set(this.auth, 'user', {});
      this.$set(this.auth, 'loggedin', false);
    },
    preparePopUps: function () {
      $('div.black').click(function(event) {
        $(event.target).closest('div.popup').removeClass('open');
        $(event.target).fadeOut();
      });
    },
    joinProject: function (projectId) {
      var vm = this;

      $.ajax({
        url: this.apiPath + "join_project.php",
        data: {
          projectId: projectId
        },
        complete: function() {
          vm.$router.go();
        }
      });
    },
    invite: function(projectId, userId) {
      var vm = this;

      $.ajax({
        url: vm.$root.apiPath + "join_project.php",
        data: {
          projectId: projectId,
          userId: userId
        },
        complete: function() {
          vm.$router.go();
        }
      });
    },
  },
  beforeMount() {
    this.login();   

    this.$router.beforeEach((to, from, next) => {
      if (!this.auth.loggedin && to.path != "/") alert("Faça login primeiro!")
      else next()
    });

    if ((!this.auth.loggedin) && (this.$route.path != "/"))
      this.$router.push({path:"/"});
  },
  render: h => h(App)
}).$mount('#app')
