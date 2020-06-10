<template>
  <div class="card shadow">
    <div class="container">
      <h4 style="font-weight:500">{{ data.nome }}</h4> 
      <h6 v-if="!project" class="h6" style="color: #C4C4C4">Por <span class="span" style="color:#C95925">{{ data.notas[0].user.nome }}</span></h6> 
      <p v-if="project">{{ data.bio }}</p>
      <p v-if="!project">{{ data.notas[0].valor }}</p>
      <h6 class="h6" style="color: #C95925">{{ (data.estado == 0)? "Em Progresso" : "Terminado"}}</h6>
      <h6 v-if="!project" class="h6" style="color: #C4C4C4">Última atualização em {{ data.notas[data.notas.length-1].dataCriacao }}</h6>
      <div style="text-align: center">
        <a v-if="!project" v-on:click="detalhesFun()" class="button secondary">Ver Detalhes</a>
        
        <a v-if="project" :href="'#/project/'+data.id" class="button">Ver Mais</a>
        <a v-if="project"  href="" class="button secondary disabled">Participar</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    project: Boolean,
    data: Object,
    detalhesFun: Function
  }
}
</script>

<style lang="scss" scoped>
.card {
    transition: 0.3s;
    width: 300px;
    left: 19px;
    top: 600px;

    background: #FFFFFF;
    border-radius: 5px;
    display: inline-block;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 20px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
}

h4 {
  margin: 0;
}

.h6 {
    font-weight: normal;
    margin-top: 0;
}

.parent {
        display: inline-flex;
}

.dot {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        margin-right: -5px;
        color: #FFFFFF;
        font-size: 70%;
}

a.button {
  margin: 0;
}

p {
  word-break: break-all;
}
</style>

