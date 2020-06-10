<template>
  <div class="user">
      <img :src="$root.getUserImage(data)" class="profilepic">
      <p>{{data.nome}}</p>
      <button class="mybutton"></button>
  </div>
</template>

<script>
export default {
  name: "ColabIcon",
  props: {
      data: Object
  }
}
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  padding-left: 35px;
  box-sizing: border-box;
  line-height: 50px;
  background-color: #e5e5e5; 
  margin: 0;
  width: 194px;
  margin-left: 28px;
  display: inline-block;
}

.user {
  height: 50px; 
  display: inline-block; 
  position: relative;
  margin: 10px 40px;
}

.profilepic {
  border-radius: 100%; 
  width: 56px; 
  height: 56px;
  position: absolute;
  box-shadow: 2px 2px 10px rgba(0,0,0,.25);
  top: -3px;
  left: 0;
}

.mybutton {
  display: inline-block;
  background-color: #C95925; 
  height: 50px; 
  width: 50px; 
  border:0; 
  padding: 0; 
  position: absolute;
}
    
</style>