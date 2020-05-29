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
      }
    }
  },
  methods: {
    login: function () {
      var vm = this;

      $.ajax({
        url: "https://masrecruits.000webhostapp.com/api/get_users.php",
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
    }
  },
  beforeMount() {
    this.login();
  },
  render: h => h(App)
}).$mount('#app')
