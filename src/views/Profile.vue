<template>
  <div><p>User + {{ curId }}</p></div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Profile",
  data: function() {
    return {
      data: {
        user: {}
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>