import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faBars, faGithub])

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
        url: "http://localhost/RecruitsAPI/get_users.php",
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
    getUserImage() {
      var l = this.auth.user.ligacoes;
      for (var i=0; i<l.length; i++)
        if (l[i].nome == "Image")
          return l[i].valor;
    },
    logout() {
      this.$set(this.auth, 'user', {});
      this.$set(this.auth, 'loggedin', false);
      //this.$router.go();
    }
  },
  beforeMount() {
    this.login();
  },
  render: h => h(App)
}).$mount('#app')
