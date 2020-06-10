<template>
  <div class="nota">
      <img :src="$root.getUserImage(data.user)" class="profilepic">
      <div class="content">
          <div class="header">
              <p class="usertitle">{{data.user.nome}} <span class="lighttext">disse:</span></p>
              <p class="date">{{data.dataCriacao}}</p>
          </div>
          <p class="usermessage lighttext">{{data.valor}}</p>    
      </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    data: Object
  },
  mounted() {
    console.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
.nota {
  text-align: left;
  width:92.5%;
  background-color: #e5e5e5; 
  position: relative;
  padding: 15px; 
  padding-right: 20px; 
  padding-bottom: 25px;
  box-sizing: border-box; margin:auto; 
  margin-top: 30px;
}

img.profilepic {
  border-radius: 100%; 
  width: 75px; 
  height: 75px; 
  position: absolute; 
  left: -20px; 
  top: -15px; 
}

p.usertitle {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
  font-style: normal; 
  font-weight: normal; 
  font-size: 20px; 
  line-height: 25px; 
  margin-left: 45px;
}

p.date {
  float: right; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
  font-style: normal; 
  font-weight: normal; 
  font-size: 20px; 
  line-height: 25px;
}

p.usermessage {
  margin-top: 5px; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
  font-style: normal; 
  font-weight: normal; 
  font-size: 18px; 
  line-height: 20px; 
  margin-left: 45px;
  word-break: break-all;
}

.lighttext {
  color: rgba(0, 0, 0, 0.62);
}

p {
  margin: 0; 
  display: inline-block;
}
</style>